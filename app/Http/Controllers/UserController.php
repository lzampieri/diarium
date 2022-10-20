<?php

namespace App\Http\Controllers;

use App\Models\LoginMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
}