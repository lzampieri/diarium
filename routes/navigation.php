<?php

use App\Http\Controllers\SectionController;
use App\Http\Controllers\WorkspaceController;
use App\Models\Section;
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
Route::get('/w/{ws}/{sc}', [SectionController::class, 'viewSection'])
    ->where('ws', '[0-9]+')
    ->where('sc', '[0-9]+')
    ->name('section')
    ->breadcrumbs( function (Trail $trail, Workspace $ws, Section $sc) {
        $trail->parent('home')
        ->push($ws->name, route('workspace', [ 'ws' => $ws->id ]) )
        ->push($sc->name, route('section', [ 'ws' => $ws->id, 'sc' => $sc->id ]) ); } );

Route::post('/w/{ws}/add', [SectionController::class, 'addSection'])
    ->where('ws', '[0-9]+')
    ->name('section.add');
Route::post('/s/edit', [SectionController::class, 'editSection'])
    ->name('section.edit');
Route::post('/s/delete', [SectionController::class, 'deleteSection'])
    ->name('section.delete');

// Thinks
// Route::get('/w/{ws}/thinks', function(Workspace $ws) {
//     return $ws->load('thinks');
// });
// Route::get('/s/{sc}/thinks', function(Section $sc) {
//     return $sc->load('thinks'); 
// });
Route::get('/w/{ws}/all_thinks', function(Workspace $ws) {
    // DB::connection()->enableQueryLog();
    $ws->load('thinks');
    $ws['thinks']->load('thinkable');
    // $queries = DB::getQueryLog();
    // $data['log'] = end( $queries );
    // $data['full_query'] =
    //     Str::replaceArray('?',
    //     $data['log']['bindings'],
    //     $data['log']['query']);
    return $ws;
});