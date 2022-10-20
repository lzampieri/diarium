<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render( 'Home', [ 'user' => Auth::user() ] );
})->name('home');

Route::get('/user/profile', [UserController::class, 'userProfile'])
    ->name('user.profile');