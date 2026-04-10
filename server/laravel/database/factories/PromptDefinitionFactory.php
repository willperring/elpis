<?php

namespace Database\Factories;

use App\Models\PromptDefinition;
use Illuminate\Database\Eloquent\Factories\Factory;

class PromptDefinitionFactory extends Factory
{
    protected $model = PromptDefinition::class;

    public function definition(): array
    {
        return [
            'group' => $this->faker->word(),
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->sentence(),
        ];
    }
}
