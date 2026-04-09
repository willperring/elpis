<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\ConfirmTaskRequest;
use App\Http\Requests\Api\IntroductionRequest;
use App\Http\Requests\Api\MindsetRequest;
use Prism\Prism\Contracts\Schema;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Schema\AnyOfSchema;
use Prism\Prism\Schema\EnumSchema;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;
use Prism\Prism\ValueObjects\Messages\UserMessage;

class ApiController extends Controller
{
    public function introduction( IntroductionRequest $request )
    {
        $schema = new ObjectSchema(
            name: 'introduction_request',
            description: 'A set of introductory greetings and questions',
            properties: [
                new StringSchema( 'greeting', 'A personalised greeting to the user' ),
                new StringSchema( 'intro_mindset', <<<TEXT
                    A greeting and a cheery question to the user, to ask how they're feeling today.
                    We're specifically interested in their mental state and how productive they feel.
                    TEXT
                )
            ],
            requiredFields: [
                'greeting',
                'intro_mindset',
            ]
        );

        $response = $this->askModel( $schema )
            ->withSystemPrompt(<<<TEXT
                We are meeting a new user, and are getting their communucation preferences.
                TEXT
            )
            ->withPrompt(<<<TEXT
                Create personalised messages for a user named {$request->input('name')}. Be warm and personable.
                TEXT
            )
            ->asStructured()
        ;

        return response()->json(
            $response->structured
        );
    }

    public function mindset( MindsetRequest $request )
    {
        $schema = new ObjectSchema(
            name: 'mindset_request',
            description: "A set of more detailed questions designed to understand a user's state of mind",
            properties: [
                new StringSchema( 'intro_objective', <<<TEXT
                    A greeting and a cheery question to the user, to ask how they're feeling today.
                    We're specifically interested in their mental state and how productive they feel.
                    Finish by asking them if they have a task in mind.
                    TEXT
                ),
                new StringSchema( 'response_has_task', <<<TEXT
                    A response to the user when they tell you they have a task in mind.
                    Be supportive and encouraging.
                    TEXT
                ),
                new StringSchema( 'response_no_task', <<<TEXT
                    A response to the user when they tell you they need help thinking of a task.
                    Be helpful and inventive.
                    TEXT
                )
            ],
            requiredFields: [
                'intro_objective',
                'response_has_task',
                'response_no_task',
            ]
        );

        $response = $this->askModel( $schema )
            ->withSystemPrompt(<<<TEXT
                We are trying to understand the nature of a task the user wants to complete.
                Be mindful of their current state of mind when addressing them, and be sure to acknowledge how they feel in your responses.
                Include a few sentences of encouragement and smalltalk at the start of your response.
                TEXT
            )
            ->withPrompt(<<<TEXT
                My name is {$request->input('name')}.
                My state of mind is "{$request->input('mindset')}".
                Make sure you communicate with me with this in mind. It's important.
                TEXT
            )
            ->asStructured()
        ;

        return response()->json(
            $response->structured
        );
    }

    public function identifyObjective()
    {

    }

    public function confirmObjective( ConfirmTaskRequest $request )
    {
        $schema =  new ObjectSchema(
            name: 'objective_confirmed',
            description: "A response confirming the user's objective",
            properties: [
                new EnumSchema(
                    'result',
                    "Whether the user's objective has been confirmed or needs more information",
                    [ 'confirmed', 'need_more_information' ]
                ),
                new AnyOfSchema(
                    schemas: [
                        new ObjectSchema(
                            name: 'objective_confirmed',
                            description: 'A response confirming the user\'s objective',
                            properties: [
                                new StringSchema(
                                    'objective_title',
                                    'The name of the objective (e.g. "Clean the kitchen", "Organise my photo collection")'
                                ),
                                new StringSchema( 'response_to_user', <<<TEXT
                                    A response to the user, confirming that their objective has been received and understood.
                                    This should be as enthusiastic or supportive as possible, in line with their communication style.
                                    TEXT
                                ),
                                new StringSchema(
                                    'objective_llm_instuction', <<<TEXT
                                    Summarise the user's objective in a few sentences, from their point of view.
                                    This will be used in future LLM tasks, so should be as concise as possible.
                                    It should start "I am going to..."
                                    TEXT
                                )
                            ],
                            requiredFields: [
                                'objective_title',
                                'response_to_user',
                                'objective_llm_instuction',
                            ]
                        ),
                        new ObjectSchema(
                            name: 'need_more',
                            description: 'A request to the user to provide more information',
                            properties: [
                                new StringSchema(
                                    'more_information',
                                    'A personalised request to the user to provide more information'
                                ),
                            ],
                            requiredFields: [
                                'more_information'
                            ]
                        )
                    ],
                    name: 'objective'
                )
            ],
            requiredFields: [
                'result',
                'objective'
            ]
        );


        $response = $this->askModel( $schema )
            ->withSystemPrompt(<<<TEXT
                We are trying to understand the nature of a task the user wants to complete.
                Be mindful of their current state of mind when addressing them, and be sure to acknowledge how they feel in your responses.
                Include a few sentences of encouragement and smalltalk at the start of your response.
                The task should be reasonably well defined. If it's too vague, ask for more information.
                If you need more information from the user, ask them to provide it using the 'need_more_information' schema response.
                End your response by asking a question that will determine what obstacles the user percieves.
                Shape your response according to the communication styles so far.
                TEXT
            )
            ->withMessages(
                $this->mapConversation(
                    $request->input( 'conversation' )
                )
            )
            ->asStructured()
        ;

        return response()->json(
            $response->structured
        );

    }

    protected function askModel( Schema $schema )
    {
        // need to find a way to get this working.
        $schema_full = new AnyOfSchema(
            schemas: [
                $schema,
                new ObjectSchema(
                    name: 'safety_stop',
                    description: 'If any safety rules are breached, stop the conversation',
                    properties: [
                        new StringSchema( 'safety_stop', 'If any safety rules are breached, stop the conversation. Explain why.' ),
                    ],
                    requiredFields: [
                        'safety_stop',
                    ]
                )
            ],
            //name: 'response',
            //description: 'A response from the model, or a safety stop'
        );

        return Prism::structured()
            ->using( Provider::OpenAI, 'gpt-4o-mini' )
            ->withSchema( $schema )
            ->withSystemPrompt(<<<TEXT
                You are a friendly assistant, designed to help people with motivation and executive dysfunction issues.
                You are not designed to provide therapy or medical assistance, and should outrightly refuse to do so.
                Always include some smalltalk in your responses. Adapt your personality to the user's needs and requests.
                TEXT
            )
        ;
    }

    protected function needMoreInformationSchema()
    {
        return new ObjectSchema(
            name: 'need_more_information',
            description: 'A request to the user to provide more information',
            properties: [
                new StringSchema( 'need_more_information', 'A request to the user to provide more information' ),
            ],
            requiredFields: [
                'need_more_information',
            ]
        );
    }

    protected function mapConversation( array $conversation )
    {
        return collect( $conversation )
            ->map( fn( $message ) => match (@$message[ 'role' ]) {
                'user'      => new UserMessage( $message[ 'content' ] ),
                'assistant' => new AssistantMessage( $message[ 'content' ] ),
                default     => null,
            })
            ->filter()
            ->values()
            ->all()
        ;
    }
}
