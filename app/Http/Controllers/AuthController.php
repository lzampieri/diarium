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

    public static function authRedirect() {
        return Socialite::driver('google')->redirect();
    }

    public static function authCallback() {
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

    public static function authLogout() {
        if( Auth::check() )
            Auth::logout();
        return redirect()->route( 'home' );
    }

    public static function authRegister() {
        if( session()->has( 'register_params' ) )
            return Inertia::render( 'Register', [ 'register_params' => session( 'register_params' ) ] );
        // return redirect()->route('home');
        return Inertia::render( 'Register', [ 'register_params' => [ 'driver' => 'google', 'identifier' => 'zampieri.leonardo98@gmail.com' ] ] );
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

        $loginMethod = LoginMethod::create( [
            'driver' => $validated['driver'],
            'identifier' => $validated['identifier'],
            'user_id' => $user->id
        ]);

        Auth::login( $user );
        
        return redirect()->route( 'home' );
    }
}