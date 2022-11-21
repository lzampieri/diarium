<?php

namespace App\Http\Controllers;

use App\Models\LoginMethod;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

class LogController extends Controller
{

    public static function getDefaultTrailing()
    {
        $output = ' | ' . Request::ip();
        if (Auth::check())
            $output .= ' | ' . Auth::user()->username;
        return $output;
    }

    public static function dumpValue($value)
    {
        if ($value instanceof LoginMethod) {
            return $value->driver . " (" . $value->identifier . ")";
        }

        if ($value instanceof User) {
            return $value->username;
        }

        if ($value instanceof Workspace) {
            return $value->name . " (" . $value->user->username . ")";
        }

        return var_export($value, true);
    }

    public static function debug($message, $params = [])
    {
        if (!empty($params)) {
            foreach ($params as $key => $value) {
                $message .= $key . ': ' . LogController::dumpValue($value);
            }
        }
        Log::channel('internal')->debug($message);
    }
}
