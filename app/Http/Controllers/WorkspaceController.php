<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    // Workspace
    public static function viewWorkspace(Request $request, Workspace $ws)
    {
        return Inertia::render('Home', ['workspace' => $ws->load('sections')]);
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

        return redirect()->route('workspace', ['ws' => $ws])->with('snackbars', [['success', 'Spazio di lavoro creato ed attivato']]);
    }

    public static function renameWorkspace(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:workspaces,id',
            'name' => 'required|min:3'
        ]);

        $ws = Workspace::find($validated['id']);

        if ($ws->user_id != Auth::user()->id)
            return redirect()->back()->with('snackbars', [['error', 'Impossibile rinominare spazi di lavoro altrui.']]);

        $ws->name = $validated['name'];
        $ws->save();
        LogController::debug('Workspace renamed', ['Workspace' => $ws]);
        return redirect()->route('workspace', ['ws' => $ws])->with('snackbars', [['success', 'Spazio di lavoro rinominato.']]);
    }

    public static function deleteWorkspace(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:workspaces,id'
        ]);

        $ws = Workspace::find($validated['id']);

        if ($ws->user_id != Auth::user()->id)
            return redirect()->back()->with('snackbars', [['error', 'Impossibile cancellare spazi di lavoro altrui.']]);

        LogController::debug('Workspace deleted', ['Workspace' => $ws]);
        $ws->delete();
        return redirect()->route('home')->with('snackbars', [['success', 'Spazio di lavoro cancellato.']]);
    }
}
