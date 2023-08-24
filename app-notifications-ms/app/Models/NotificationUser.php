<?php

namespace App\Models;

use App\Commons\Traits\ColumnFillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationUser extends Model
{
    use HasFactory,
        ColumnFillable;

    protected $table = 'notification_users';

    public function notification()
    {
        return $this->belongsTo(Notification::class, 'id_notification');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

}
