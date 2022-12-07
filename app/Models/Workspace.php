<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Custom\WorkspaceToAllThinks;

class Workspace extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function ws_thinks()
    {
        return $this->morphMany(Think::class, 'thinkable');
    }

    public function thinks() {
        return new WorkspaceToAllThinks();
    }
}
