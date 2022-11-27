<?php

use App\Http\Controllers\SectionController;
use App\Http\Controllers\WorkspaceController;
use App\Models\Workspace;
use Illuminate\Support\Facades\Route;
use Tabuna\Breadcrumbs\Trail;

// Workspace
Route::get('/w/{ws}', [WorkspaceController::class, 'viewWorkspace'])
    ->where('ws', '[0-9]+')
    ->name('workspace')
    ->breadcrumbs( function (Trail $trail, Workspace $ws) { $trail->parent('home')->push($ws->name, route('workspace', [ 'ws' => $ws->id ]) ); } );

Route::post('/w/add', [WorkspaceController::class, 'addWorkspace'])
    ->name('workspace.add');
Route::post('/w/rename', [WorkspaceController::class, 'renameWorkspace'])
    ->name('workspace.rename');
Route::post('/w/delete', [WorkspaceController::class, 'deleteWorkspace'])
    ->name('workspace.delete');

// Sections
Route::post('/w/{ws}/add', [SectionController::class, 'addSection'])
    ->where('ws', '[0-9]+')
    ->name('section.add');
Route::post('/s/edit', [SectionController::class, 'editSection'])
    ->name('section.edit');
Route::post('/s/delete', [SectionController::class, 'deleteSection'])
    ->name('section.delete');
