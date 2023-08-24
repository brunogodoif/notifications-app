<?php

namespace App\Models;

use App\Commons\Traits\ColumnFillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory,
        ColumnFillable;

    protected $table = 'notifications';

    public function notice()
    {
        return $this->hasOne(Notice::class, 'id', 'id_notice');
    }

    public function notificationUser()
    {
        return $this->hasOne(NotificationUser::class, 'id_notification');
    }

    public static function createNotification(array $data): Notification
    {
        $notice = Notice::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'author' => $data['author'],
        ]);

        $notification = self::create([
            'id_notice' => $notice->id,
            'alias' => $data['alias'],
            'published' => $data['published'],
            'status' => $data['status'],
        ]);

        $notificationUser = NotificationUser::create([
            'id_notification' => $notification->id,
            'id_user' => $data['idUser'],
            'seen' => $data['seen'],
            'date_seen' => $data['dateSeen'],
        ]);

        return $notification;
    }

    public static function updateNotification(int $id, array $data): bool
    {
        $notification = self::whereId($id)->first();
        $notification->update([
            'alias' => $data['alias'],
            'published' => $data['published'],
            'status' => $data['status'],
        ]);

        $notification->notice()->first()->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'author' => $data['author'],
        ]);

        $notification->notificationUser()->update([
            'id_notification' => $notification->id,
            'id_user' => $data['idUser'],
            'seen' => $data['seen'],
            'date_seen' => $data['dateSeen'],
        ]);

        return true;
    }

    public static function republishNotification(int $id): bool
    {
        Notification::activateNotification($id);
        $notification = self::whereId($id)->first();
        return $notification->update([
            'published' => true,
        ]);
    }

    public static function activateNotification(int $id): bool
    {
        $notification = self::whereId($id)->first();
        return $notification->update([
            'status' => true,
            'inactivation_date' => null,
            'inactivation_reason' => null,
        ]);
    }

    public static function deactivateNotification(int $id, array $data): bool
    {
        $notification = self::whereId($id)->first();
        return $notification->update([
            'status' => false,
            'inactivation_date' => now(),
            'inactivation_reason' => $data['inactivationReason']
        ]);
    }

}
