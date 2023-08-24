<?php

namespace App\Repositories\Interfaces;

use App\Commons\Interfaces\DeleteRepositoryInterface;
use App\Commons\Interfaces\PaginateListingRepositoryInterface;
use App\Models\Notification;

interface NotificationRepositoryInterface extends
    PaginateListingRepositoryInterface,
    DeleteRepositoryInterface
{
    public function create(array $notification): Notification;

    public function update(int $id, array $notification): bool;

    public function getById(int $id): Notification|null;

    public function activate(int $id): bool;

    public function deactivate(int $id, array $notification): bool;

    public function republish(int $id): bool;

}
