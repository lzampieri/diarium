<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Section extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
        'workspace_id',
        'color'
    ];

    public function workspace() {
        return $this->belongsTo( Workspace::class );
    }

}
