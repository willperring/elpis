<?php

namespace Tests\Feature\Api;

use App\Models\Prompt;
use App\Models\PromptDefinition;
use App\Models\PromptSet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromptControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_prompts()
    {
        Prompt::factory()->count(2)->create();

        $response = $this->getJson(route('api.v1.prompts.index'));

        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonStructure([
                '*' => ['id', 'content', 'definition', 'set']
            ]);
    }

    public function test_can_create_or_update_prompt()
    {
        $definition = PromptDefinition::factory()->create();
        $set = PromptSet::factory()->create();
        $data = [
            'prompt_definition_id' => $definition->id,
            'prompt_set_id' => $set->id,
            'content' => 'New prompt content',
        ];

        // Create
        $response = $this->postJson(route('api.v1.prompts.store'), $data);

        $response->assertStatus(201)
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('prompts', $data);

        // Update with same keys
        $updatedData = array_merge($data, ['content' => 'Updated content']);
        $response = $this->postJson(route('api.v1.prompts.store'), $updatedData);

        $response->assertStatus(201)
            ->assertJsonFragment(['content' => 'Updated content']);

        $this->assertDatabaseHas('prompts', ['id' => $response->json('id'), 'content' => 'Updated content']);
        $this->assertDatabaseCount('prompts', 1);
    }

    public function test_can_show_prompt()
    {
        $prompt = Prompt::factory()->create();

        $response = $this->getJson(route('api.v1.prompts.show', $prompt));

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $prompt->id, 'content' => $prompt->content])
            ->assertJsonStructure(['id', 'content', 'definition', 'set']);
    }

    public function test_can_update_prompt()
    {
        $prompt = Prompt::factory()->create();
        $updateData = [
            'prompt_definition_id' => $prompt->prompt_definition_id,
            'prompt_set_id' => $prompt->prompt_set_id,
            'content' => 'Updated content through PUT'
        ];

        $response = $this->putJson(route('api.v1.prompts.update', $prompt), $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('prompts', $updateData);
    }

    public function test_can_delete_prompt()
    {
        $prompt = Prompt::factory()->create();

        $response = $this->deleteJson(route('api.v1.prompts.destroy', $prompt));

        $response->assertStatus(204);
        $this->assertDatabaseMissing('prompts', ['id' => $prompt->id]);
    }
}
