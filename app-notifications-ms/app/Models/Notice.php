<?php

namespace App\Models;

use App\Commons\Traits\ColumnFillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory,
        ColumnFillable;

    protected $table = 'notices';

    public function notification()
    {
        return $this->belongsTo(Notification::class, 'id_notice');
    }

}
