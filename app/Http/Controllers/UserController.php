<?php

namespace App\Http\Controllers;

use App\Models\LoginMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\MessageBag;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller {

    public static function userProfile() {
        $user = Auth::user(); /** @var App\Models\User $user */

        return Inertia::render('UserManagement/UserProfile',[
            'user' => $user,
            'loginMethods' => $user->loginMethods
        ]);

    }

    
    public static function renameLoginMethods(Request $request) {
        $user = Auth::user(); /** @var App\Models\User $user */
        $loginMethods = $user->loginMethods;
        $expected_content = [];
        foreach( $loginMethods as $lm ) {
            $expected_content[ 'lm_' . $lm->id ] = 'required|min:3';
        }

        $validated = $request->validate( $expected_content );

        foreach( $loginMethods as $lm ) {
            $lm->name = $validated[ 'lm_' . $lm->id ];
            $lm->save();
        }

        return redirect()->route('user.profile');
    }

    public static function deleteLoginMethod(Request $request) {
        $user = Auth::user(); /** @var App\Models\User $user */
        $loginMethod = LoginMethod::find( $request->input('id') );

        if( !$loginMethod ) {
            return redirect()->back()->withErrors(new MessageBag(["deleting" => "Credenziali non trovate" ]));
        }
        
        if( $loginMethod->user_id != $user->id ) {
            return redirect()->back()->withErrors(new MessageBag(["deleting" => "Operazione non permessa" ]));
        }

        if( count( $user->loginMethods ) < 2 ) {
            return redirect()->back()->withErrors(new MessageBag(["deleting" => "Impossibile rimanere senza credenziali" ]));
        }

        $loginMethod->delete();

        return redirect()->route('user.profile');
    }
}