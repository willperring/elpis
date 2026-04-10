<?php

namespace Database\Factories;

use App\Models\Prompt;
use App\Models\PromptDefinition;
use App\Models\PromptSet;
use Illuminate\Database\Eloquent\Factories\Factory;

class PromptFactory extends Factory
{
    protected $model = Prompt::class;

    public function definition(): array
    {
        return [
            'prompt_definition_id' => PromptDefinition::factory(),
            'prompt_set_id' => PromptSet::factory(),
            'content' => $this->faker->paragraph(),
        ];
    }
}
