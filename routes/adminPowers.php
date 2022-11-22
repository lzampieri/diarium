<?php

use Illuminate\Support\Facades\Route;

Route::middleware('admin')->prefix('admin')->group(function () {
    
    // Log
    Route::get( 'log', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index'])
           ->name('admin.log');

});