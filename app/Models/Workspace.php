<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workspace extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo( User::class );
    }

}
