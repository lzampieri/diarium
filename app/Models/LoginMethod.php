<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginMethod extends Model
{
    protected $fillable = [
        'driver',
        'identifier',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo( User::class );
    }
}
