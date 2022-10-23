<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Routes relative to autenticating

// Logout
Route::get('/auth/logout', [ AuthController::class, 'authLogout'])
     ->name('auth.logout');

// Login google
Route::get('/auth/google/login', [ AuthController::class, 'googleAuthRedirect'])
     ->name('auth.google.login');
     Route::get('/auth/google/callback', [ AuthController::class, 'googleAuthCallback'])
     ->name('auth.google.callback');
     
// Login TOTP
Route::get('/auth/totp/login', function () { return Inertia::render('TOTPLogin' ); })
     ->name('auth.totp.login');
Route::post('/auth/totp/login', [ AuthController::class, 'totpLogin'] );

// Register
Route::get('/auth/register', [ AuthController::class, 'authRegister'])
      ->name('auth.register');
Route::post('/auth/register', [ AuthController::class, 'authRegisterPost']);
