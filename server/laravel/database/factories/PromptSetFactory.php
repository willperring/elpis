<?php

namespace Database\Factories;

use App\Models\PromptSet;
use Illuminate\Database\Eloquent\Factories\Factory;

class PromptSetFactory extends Factory
{
    protected $model = PromptSet::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'version' => $this->faker->numerify('v#.#.#'),
            'is_active' => false,
        ];
    }

    public function active(): self
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }
}
