<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\NotificationUser;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NotificationUser>
 */
class NotificationUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = NotificationUser::class;

    public function definition()
    {
        return [
            'id_notification' => Notification::factory(),
            'id_user' => User::factory(),
            'seen' => $this->faker->boolean,
            'date_seen' => $this->faker->dateTime,
        ];
    }
}
