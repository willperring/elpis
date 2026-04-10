<?php

namespace Tests\Unit\Models;

use App\Models\Prompt;
use App\Models\PromptDefinition;
use App\Models\PromptSet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromptTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_active_returns_correct_content()
    {
        // Arrange
        $definition = PromptDefinition::factory()->create(['name' => 'test-prompt']);
        $activeSet = PromptSet::factory()->active()->create();
        $inactiveSet = PromptSet::factory()->create();

        Prompt::factory()->create([
            'prompt_definition_id' => $definition->id,
            'prompt_set_id' => $activeSet->id,
            'content' => 'Active content'
        ]);

        Prompt::factory()->create([
            'prompt_definition_id' => $definition->id,
            'prompt_set_id' => $inactiveSet->id,
            'content' => 'Inactive content'
        ]);

        // Act
        $result = Prompt::getActive('test-prompt');

        // Assert
        $this->assertEquals('Active content', $result);
    }

    public function test_get_active_returns_null_if_no_active_set()
    {
        // Arrange
        $definition = PromptDefinition::factory()->create(['name' => 'test-prompt']);
        $inactiveSet = PromptSet::factory()->create();

        Prompt::factory()->create([
            'prompt_definition_id' => $definition->id,
            'prompt_set_id' => $inactiveSet->id,
            'content' => 'Inactive content'
        ]);

        // Act
        $result = Prompt::getActive('test-prompt');

        // Assert
        $this->assertNull($result);
    }

    public function test_get_active_returns_null_if_prompt_missing_in_active_set()
    {
        // Arrange
        $definition = PromptDefinition::factory()->create(['name' => 'test-prompt']);
        $activeSet = PromptSet::factory()->active()->create();

        // No prompt for this definition in the active set

        // Act
        $result = Prompt::getActive('test-prompt');

        // Assert
        $this->assertNull($result);
    }
}
