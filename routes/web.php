<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Rap2hpoutre\LaravelLogViewer\LogViewerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group( function () {

    include( 'logged.php' );

});

Route::get('/unlogged', function () {
    return Inertia::render( 'Unlogged' );
})->name('unlogged');

include( 'auth.php' );

Route::get('/logs', [LogViewerController::class, 'index']);