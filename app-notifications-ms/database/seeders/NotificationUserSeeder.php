<?php

namespace Database\Seeders;

use App\Models\NotificationUser;
use Illuminate\Database\Seeder;

class NotificationUserSeeder extends Seeder
{
    public function run()
    {
        NotificationUser::factory(1)->create();
    }
}
