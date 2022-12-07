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

    public function thinks()
    {
        return $this->morphMany(Think::class, 'thinkable');
    }

    public function all_thinks()
    {
        $query = Think::where(function ($query) {
            $query->where('thinkable_type', 'App\Models\Workspace')
                ->where('thinkable_id', $this->id);
        });

        foreach ($this->sections as $section) {
            $query = $query->orWhere(function ($query) use ($section) {
                $query->where('thinkable_type', 'App\Models\Section')
                    ->where('thinkable_id', $section->id);
            });
        }

        return $query->get();
    }

    public function all_thinks_r() {
        return new WorkspaceToAllThinks();
    }
}
