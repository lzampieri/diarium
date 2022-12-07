<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Think extends Model
{
    protected $fillable = [
        'thinkable_id',
        'thinkable_type',
        'type',
        'content'
    ];

    public function thinkable() {
        return $this->morphTo();
    }
}
