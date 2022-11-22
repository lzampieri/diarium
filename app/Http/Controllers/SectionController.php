<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SectionController extends Controller
{
    // Section
    // public static function viewWorkspace(Request $request, Workspace $ws)
    // {
    //     return Inertia::render('Home', ['workspace' => $ws->id]);
    // }

    public static function addSection(Request $request, Workspace $ws)
    {
        $validated = $request->validate([
            'name' => 'required|min:3'
        ]);

        $sc = Section::create([
            'name' => $validated['name'],
            'workspace_id' => $ws->id,
        ]);

        LogController::debug('New section created', ['Section' => $sc]);

        return redirect()->route('workspace', ['ws' => $ws])->with('snackbars', [['success', 'Sezione creata ed attivata']]);//todo
    }

    // public static function renameWorkspace(Request $request)
    // {
    //     $validated = $request->validate([
    //         'id' => 'required|exists:workspaces,id',
    //         'name' => 'required|min:3'
    //     ]);

    //     $ws = Workspace::find($validated['id']);

    //     if ($ws->user_id != Auth::user()->id)
    //         return redirect()->back()->with('snackbars', [['error', 'Impossibile rinominare spazi di lavoro altrui.']]);

    //     $ws->name = $validated['name'];
    //     $ws->save();
    //     LogController::debug('Workspace renamed', ['Workspace' => $ws]);
    //     return redirect()->route('workspace', ['ws' => $ws])->with('snackbars', [['success', 'Spazio di lavoro rinominato.']]);
    // }

    // public static function deleteWorkspace(Request $request)
    // {
    //     $validated = $request->validate([
    //         'id' => 'required|exists:workspaces,id'
    //     ]);

    //     $ws = Workspace::find($validated['id']);

    //     if ($ws->user_id != Auth::user()->id)
    //         return redirect()->back()->with('snackbars', [['error', 'Impossibile cancellare spazi di lavoro altrui.']]);

    //     LogController::debug('Workspace deleted', ['Workspace' => $ws]);
    //     $ws->delete();
    //     return redirect()->route('home')->with('snackbars', [['success', 'Spazio di lavoro cancellato.']]);
    // }
}
