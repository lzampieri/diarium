<?php

namespace App\Http\Controllers;

use App\Models\LoginMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller {

    // General
    public static function authLogout() {
        if( Auth::check() )
            Auth::logout();
        return redirect()->route( 'home' );
    }

    // Registration
    public static function authRegister() {
        if( session()->has( 'register_params' ) )
            return Inertia::render( 'UserManagement/Register', [ 'register_params' => session( 'register_params' ) ] );
        return redirect()->route('home');
    }

    public static function authRegisterPost( Request $request ) {
        Log::debug( 'Validation' );

        $validated = $request->validate([
            'driver' => 'required|in:google',
            'identifier' => 'required',
            'username' => 'required|alpha_dash|unique:users,username',
            'complete_name' => 'required'
        ]);

        Log::debug( 'Validation' );

        $user = User::create( [
            'username' => $validated['username'],
            'complete_name' => $validated['complete_name']
        ]);

        // If already a login method exists, update id
        $find = LoginMethod::withTrashed()
                           ->where( 'driver', $validated['driver'] )
                           ->where( 'identifier', $validated['identifier'] )
                           ->first();
        if( $find ) {
            // If is trashed, restore it
            if( $find->trashed() ) {
                $find->restore();
            }
            $find->user_id = $user->id;
            $find->name = 'Principale';
            $find->save();
        } else {
            LoginMethod::create( [
                'driver' => $validated['driver'],
                'identifier' => $validated['identifier'],
                'name' => 'Principale',
                'user_id' => $user->id
            ]);
        }


        Auth::login( $user );
        
        return redirect()->route( 'home' );
    }

    // Google

    public static function googleAuthRedirect() {
        return Socialite::driver('google')->redirect();
    }

    public static function googleAuthCallback() {
        $user = Socialite::driver('google')->user();
        $loginMethod = LoginMethod::where( 'driver', 'google' )
                                  ->where( 'identifier', $user->email )
                                  ->first();
        if( $loginMethod ) {
            Auth::login( $loginMethod->user );
            return redirect()->route( 'home' );
        } else {
            return redirect()->route( 'auth.register' )
                    ->with( 'register_params', [
                        'driver' => 'google',
                        'identifier' => $user->email,
                        'username' => str_replace( '.', '_', substr( $user->email, 0, strpos( $user->email, '@' ) ) ),
                        'complete_name' => $user->name
                    ]);
        }    
    }

}