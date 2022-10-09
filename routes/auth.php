<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;


// Routes relative to autenticating

// Login
Route::get('/auth/login', function () {
    return Socialite::driver('google')->redirect();
})->name('auth.login');
 
Route::get('/auth/callback', function () {
    $user = Socialite::driver('google')->stateless()->user();
    return redirect()->route( 'home' );
})->name('auth.callback');

