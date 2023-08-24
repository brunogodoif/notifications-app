<?php

namespace Database\Factories;

use App\Models\Notice;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Notification::class;

    public function definition()
    {
        return [
            'id_notice' => Notice::factory(), // Criando uma relação com uma Notice existente
            'alias' => $this->faker->word,
            'published' => $this->faker->boolean,
            'status' => $this->faker->boolean,
        ];
    }
}
