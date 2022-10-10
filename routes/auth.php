<?php

use App\Http\Controllers\AuthController;
use App\Models\LoginMethod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;


// Routes relative to autenticating

// Login
Route::get('/auth/login', [ AuthController::class, 'authRedirect'])
     ->name('auth.login');

Route::get('/auth/logout', [ AuthController::class, 'authLogout'])
     ->name('auth.logout');
 
Route::get('/auth/callback', [ AuthController::class, 'authCallback'])
     ->name('auth.callback');

// Register
Route::get('/auth/register', [ AuthController::class, 'authRegister'])
      ->name('auth.register');
Route::post('/auth/register', [ AuthController::class, 'authRegisterPost']);
