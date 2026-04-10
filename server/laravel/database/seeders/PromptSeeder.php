<?php

namespace Database\Seeders;

use App\Models\Prompt;
use App\Models\PromptDefinition;
use App\Models\PromptSet;
use Illuminate\Database\Seeder;

class PromptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $v1 = PromptSet::create([
            'name'      => 'Initial Propts',
            'version'   => '1.0.0',
            'is_active' => true,
        ]);

        $definitions = [
            [
                'group'       => 'system',
                'name'        => 'main_system_prompt',
                'description' => 'The main assistant personality and rules',
                'content'     => "You are a friendly assistant, designed to help people with motivation and executive dysfunction issues.\nYou are not designed to provide therapy or medical assistance, and should outrightly refuse to do so.\nAlways include some smalltalk in your responses. Adapt your personality to the user's needs and requests.\nAlways refer to the user by name, never 'the user' or 'user'. Unless speaking as them in the first person.",
            ],
            [
                'group'       => 'schema',
                'name'        => 'need_more_information',
                'description' => 'A personalized request to the user to provide more information',
                'content'     => 'A personalised request to the user to provide more information',
            ],
            [
                'group'       => 'schema',
                'name'        => 'safety_stop_description',
                'description' => 'Description for safety stop schema',
                'content'     => 'If any safety rules are breached, stop the conversation. Explain why.',
            ],
        ];

        foreach ($definitions as $def) {
            $definition = PromptDefinition::create([
                'group'       => $def['group'],
                'name'        => $def['name'],
                'description' => $def['description'],
            ]);

            Prompt::create([
                'prompt_definition_id' => $definition->id,
                'prompt_set_id'        => $v1->id,
                'content'              => $def['content'],
            ]);
        }
    }
}
