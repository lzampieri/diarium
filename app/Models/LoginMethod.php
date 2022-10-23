<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoginMethod extends Model
{
    use SoftDeletes;

    public const availableDrivers = ['google'];
    public const registrableDrivers = ['google'];

    protected $fillable = [
        'driver',
        'identifier',
        'name',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo( User::class );
    }
}
