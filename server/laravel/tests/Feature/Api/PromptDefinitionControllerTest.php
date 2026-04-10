<?php

namespace Tests\Feature\Api;

use App\Models\PromptDefinition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromptDefinitionControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_prompt_definitions()
    {
        PromptDefinition::factory()->count(3)->create();

        $response = $this->getJson(route('api.v1.prompt-definitions.index'));

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_can_create_prompt_definition()
    {
        $data = [
            'group' => 'Test Group',
            'name' => 'test-prompt',
            'description' => 'A test prompt description'
        ];

        $response = $this->postJson(route('api.v1.prompt-definitions.store'), $data);

        $response->assertStatus(201)
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('prompt_definitions', $data);
    }

    public function test_can_show_prompt_definition()
    {
        $definition = PromptDefinition::factory()->create();

        $response = $this->getJson(route('api.v1.prompt-definitions.show', $definition));

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $definition->id, 'name' => $definition->name]);
    }

    public function test_can_update_prompt_definition()
    {
        $definition = PromptDefinition::factory()->create();
        $updateData = [
            'group' => 'Updated Group',
            'name' => 'updated-name',
            'description' => 'Updated description'
        ];

        $response = $this->putJson(route('api.v1.prompt-definitions.update', $definition), $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('prompt_definitions', $updateData);
    }

    public function test_can_delete_prompt_definition()
    {
        $definition = PromptDefinition::factory()->create();

        $response = $this->deleteJson(route('api.v1.prompt-definitions.destroy', $definition));

        $response->assertStatus(204);
        $this->assertDatabaseMissing('prompt_definitions', ['id' => $definition->id]);
    }
}
