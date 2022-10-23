<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render( 'Home', [ 'user' => Auth::user() ] );
})->name('home');

// User management
Route::get('/user/profile', [UserController::class, 'userProfile'])
    ->name('user.profile');
Route::post('/user/renameLoginMethods', [UserController::class, 'renameLoginMethods'])
    ->name('user.renameLoginMethods');
Route::post('/user/deleteLoginMethod', [UserController::class, 'deleteLoginMethod'])
    ->name('user.deleteLoginMethod');
Route::get('/user/generateTOTP', [UserController::class, 'generateTOTP'])
    ->name('user.generateTOTP');
Route::post('/user/saveTOTP', [AuthController::class, 'saveTOTP'])
    ->name('user.saveTOTP');