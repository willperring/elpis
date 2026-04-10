<?php

namespace Tests\Feature\Api;

use App\Models\PromptSet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromptSetControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_prompt_sets()
    {
        PromptSet::factory()->count(2)->create();

        $response = $this->getJson(route('api.v1.prompt-sets.index'));

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    public function test_can_create_prompt_set()
    {
        $data = [
            'name' => 'V2 Prompts',
            'version' => '2.0.0',
            'is_active' => false,
        ];

        $response = $this->postJson(route('api.v1.prompt-sets.store'), $data);

        $response->assertStatus(201)
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('prompt_sets', $data);
    }

    public function test_can_activate_prompt_set()
    {
        $oldActiveSet = PromptSet::factory()->active()->create();
        $newSet = PromptSet::factory()->create(['is_active' => false]);

        $response = $this->postJson(route('api.v1.prompt-sets.activate', $newSet));

        $response->assertStatus(200);
        $this->assertTrue($newSet->fresh()->is_active);
        $this->assertFalse($oldActiveSet->fresh()->is_active);
    }

    public function test_can_delete_prompt_set()
    {
        $set = PromptSet::factory()->create();

        $response = $this->deleteJson(route('api.v1.prompt-sets.destroy', $set));

        $response->assertStatus(204);
        $this->assertDatabaseMissing('prompt_sets', ['id' => $set->id]);
    }
}
