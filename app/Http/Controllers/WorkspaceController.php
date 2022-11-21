<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    // Workspace
    public static function viewWorkspace(Request $request, Workspace $ws) {
        return Inertia::render('Home', [ 'workspace' => $ws->id ] );
    }

    public static function addWorkspace(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3'
        ]);

        $ws = Workspace::create([
            'name' => $validated['name'],
            'user_id' => Auth::user()->id,
        ]);

        LogController::debug('New workspace created', ['Workspace' => $ws]);

        return redirect()->route('workspace',[ 'ws' => $ws ])->with('snackbars', [['success', 'Spazio di lavoro creato ed attivato']]);
    }
    
}
