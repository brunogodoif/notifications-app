<?php

namespace App\Repositories;

use App\Models\Notification;
use App\Repositories\Interfaces\NotificationRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function count(array $filters): int
    {
        return Notification::count();
    }

    public function paginate(array $filters, int $page = 1, int $limit = 2): LengthAwarePaginator
    {
        $filters = (object) $filters;

        $query = Notification::with(['notice' => function ($query) use ($filters) {
            $query->select('id', 'title', 'description')
                ->where(function ($subquery) use ($filters) {
                    $subquery->where('title', 'ilike', "%$filters->description%")
                        ->orWhere('description', 'ilike', "%$filters->description%");
                });
        }])
            ->with(['notificationUser' => function ($query) {
                $query->select('id_notification', 'id_user', 'seen', 'date_seen');
            }])
            ->select('notifications.*')
            ->when(!empty($filters->description), function ($query) use ($filters) {
                $query->whereHas('notice', function ($subquery) use ($filters) {
                    $subquery->where('title', 'ilike', "%$filters->description%")
                        ->orWhere('description', 'ilike', "%$filters->description%");
                });
            }, function ($query) {
                $query->orderByDesc('notifications.id');
            });

        return $query->paginate($limit);
    }

    public function create(array $notification): Notification
    {
        return Notification::createNotification($notification);
    }

    public function update(int $id, array $notification): bool
    {
        return Notification::updateNotification($id, $notification);
    }

    public function delete(int $id): bool
    {
        return Notification::whereId($id)->delete();
    }

    public function getById(int $id): Notification|null
    {
        return Notification::with(['notice', 'notificationUser'])
            ->whereId($id)
            ->first();
    }

    public function activate(int $id): bool
    {
        return Notification::activateNotification($id);
    }

    public function deactivate(int $id, array $notification): bool
    {
        return Notification::deactivateNotification($id, $notification);
    }

    public function republish(int $id): bool
    {
        return Notification::republishNotification($id);
    }
}
