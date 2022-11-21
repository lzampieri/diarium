<?php

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