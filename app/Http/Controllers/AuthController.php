<?php

namespace App\Http\Controllers;

use App\Models\LoginMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\MessageBag;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use PragmaRX\Google2FA\Google2FA;

class AuthController extends Controller
{

    // General
    public static function authLogout()
    {
        if (Auth::check())
            Auth::logout();
        return redirect()->route('home');
    }

    public static function authLogin($driver, $identifier, $registerDefaults = [])
    {
        $loginMethod = LoginMethod::where('driver', $driver)
            ->where('identifier', $identifier)
            ->first();

        // If the user is not logged in, and the login method is know, log in
        if (!Auth::check() && $loginMethod) {
            Auth::login($loginMethod->user);
            LogController::debug('Login', ['via' => $loginMethod]);
            return redirect()->route('home');
        }

        // If the user is logged in and the login method is know...
        if (Auth::check() && $loginMethod) {

            // If already associate, give an info
            if ($loginMethod->user_id == Auth::user()->id) {
                return redirect()->route('user.profile')->with('snackbars', [['info', 'Le credenziali scelte sono già associate.']]);
            }

            // If associated to another user, give an error
            LogController::debug('Avoided login using other user credentials', ['via' => $loginMethod], ['from' => Auth::user()]);
            return redirect()->route('user.profile')->with('generalInfo', [['error', 'Già in uso', 'Le credenziali scelte sono già in uso da un altro utente.']]);
        }

        // If the user is logged in and the login method is new,
        // create a new method and add it to the user
        if (Auth::check()) {

            // If the login method exists but is trashed, restore
            $loginMethod = LoginMethod::withTrashed()
                ->where('driver', $driver)
                ->where('identifier', $identifier)
                ->first();
            if ($loginMethod) {
                $loginMethod->restore();
                $loginMethod->user_id = Auth::user()->id;
                $loginMethod->save();
            }

            // Else, create new
            else {
                $loginMethod = LoginMethod::create([
                    'driver' => $driver,
                    'identifier' => $identifier,
                    'name' => 'Secondario',
                    'user_id' => Auth::user()->id
                ]);
            }

            LogController::debug('New login method associated', ['Method' => $loginMethod], ['associated to' => Auth::user()]);
            return redirect()->route('user.profile')->with('snackbars', [['success', 'Associazione eseguita']]);
        }

        // If the user is not logged in and the login method is not known,
        // if the driver allow registration,
        // redirect to registration
        if (in_array($driver, LoginMethod::registrableDrivers)) {
            return redirect()->route('auth.register')
                ->with('registerParams', array_merge([
                    'driver' => $driver,
                    'identifier' => $identifier
                ], $registerDefaults));
        }

        // Redirect to login with error
        return redirect()->route('unlogged')->with('snackbars', [['error', 'Credenziali non riconosciute']]);
    }

    // Google
    public static function googleAuthRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public static function googleAuthCallback()
    {
        $user = Socialite::driver('google')->user();
        return AuthController::authLogin(
            'google',
            $user->email,
            [
                'username' => str_replace('.', '_', substr($user->email, 0, strpos($user->email, '@'))),
                'complete_name' => $user->name
            ]
        );
    }

    // TOTP
    public static function saveTOTP(Request $request)
    {
        $validated = $request->validate([
            'secretKey' => 'required',
            'name' => 'required|min:3'
        ]);

        $loginMethod = LoginMethod::create([
            'driver' => 'totp',
            'identifier' => $validated['secretKey'],
            'name' => $validated['name'],
            'user_id' => Auth::user()->id
        ]);

        LogController::debug('New login method associated', ['Method' => $loginMethod], ['associated to' => Auth::user()]);
        return redirect()->route('user.profile')->with('snackbars', [['success', 'Credenziali inserite con successo']]);
    }
    public static function totpLogin(Request $request) {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required|min:6'
        ]);

        $user = User::where('username',$validated['username'])->first();

        if( !$user ) {
            return redirect()->back()->withErrors(new MessageBag(["login" => "Utente non riconosciuto"]));
        }
        
        $lmth = $user->loginMethods()->where('driver','totp')->first();
        if( !$lmth ) {
            return redirect()->back()->withErrors(new MessageBag(["login" => "Questo utente non ha ancora abilitato le one-time password"]));
        }
        
        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey( $lmth->identifier, $validated['password']);
        if( !$valid ) {
            return redirect()->back()->withErrors(new MessageBag(["login" => "Codice non valido"]));
        }

        Auth::login( $user );
        LogController::debug('Login', ['via' => $lmth]);

        return redirect()->route('home');
    }


    // Registration
    public static function authRegister()
    {
        if (session()->has('registerParams'))
            return Inertia::render('UserManagement/Register', ['registerParams' => session('registerParams')]);
        return redirect()->route('home');
    }

    public static function authRegisterPost(Request $request)
    {

        $validated = $request->validate([
            'driver' => 'required|in:' . implode(',', LoginMethod::registrableDrivers),
            'identifier' => 'required',
            'username' => 'required|alpha_dash|unique:users,username',
            'complete_name' => 'required'
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'complete_name' => $validated['complete_name']
        ]);
        LogController::debug('New user registered', ['as' => $user]);


        // If already a login method exists, update id
        $find = LoginMethod::withTrashed()
            ->where('driver', $validated['driver'])
            ->where('identifier', $validated['identifier'])
            ->first();
        if ($find) {
            // If is trashed, restore it
            if ($find->trashed()) {
                $find->restore();
            }
            $find->user_id = $user->id;
            $find->name = 'Principale';
            $find->save();
        } else {
            $find = LoginMethod::create([
                'driver' => $validated['driver'],
                'identifier' => $validated['identifier'],
                'name' => 'Principale',
                'user_id' => $user->id
            ]);
        }

        LogController::debug('New login method registered', ['Method' => $find]);
        Auth::login($user);

        return redirect()->route('home');
    }
}
