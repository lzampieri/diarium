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
    public static function viewSection(Workspace $ws, Section $sc)
    {
        if( $ws->user_id != Auth::user()->id )
            return redirect()->route('home')->with('snackbars', [['error', 'Impossibile visualizzare spazi di lavoro altrui.']]);

        if( $sc->workspace->id != $ws->id )
            return redirect()->route('section',[ 'ws' => $sc->workspace->id, 'sc' => $sc->id ] );

        $ws->load('sections');
        $sc->load('thinks');
        $sc['thinks']->load('thinkable');
        return Inertia::render('Home', ['workspace' => $ws, 'section' => $sc ]);
    }

    public static function addSection(Request $request, Workspace $ws)
    {
        $validated = $request->validate([
            'name' => 'required|min:3',
            'color' => 'required|min:7|max:7'
        ]);

        $sc = Section::create([
            'name' => $validated['name'],
            'workspace_id' => $ws->id,
            'color' => $validated['color']
        ]);

        LogController::debug('New section created', ['Section' => $sc]);

        return redirect()->route('workspace', ['ws' => $ws])->with('snackbars', [['success', 'Sezione creata ed attivata']]); //todo
    }

    public static function editSection(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:sections,id',
            'name' => 'required|min:3',
            'color' => 'required|min:7|max:7'
        ]);

        $sc = Section::find($validated['id']);

        if ($sc->workspace->user_id != Auth::user()->id)
            return redirect()->back()->with('snackbars', [['error', 'Impossibile modificare sezioni altrui.']]);

        $sc->name = $validated['name'];
        $sc->color = $validated['color'];
        $sc->save();
        LogController::debug('Section edited', ['Section' => $sc]);
        return redirect()->back()->with('snackbars', [['success', 'Sezione modificata.']]);
    }

    public static function deleteSection(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:sections,id'
        ]);

        $sc = Section::find($validated['id']);
        $ws_id = $sc->workspace->id;

        if ($sc->workspace->user_id != Auth::user()->id)
            return redirect()->back()->with('snackbars', [['error', 'Impossibile cancellare sezioni altrui.']]);

        LogController::debug('Section deleted', ['Section' => $sc]);
        $sc->delete();
        return redirect()->route('workspace', ['ws' => $ws_id])->with('snackbars', [['success', 'Sezione cancellata.']]);
    }
}
