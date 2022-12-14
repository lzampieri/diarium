<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;

    protected $fillable = [
        'username',
        'complete_name'
        // is_admin is not fillable
    ];

    public function loginMethods() {
        return $this->hasMany( LoginMethod::class );
    }

    public function workspaces() {
        return $this->hasMany( Workspace::class );
    }
}
