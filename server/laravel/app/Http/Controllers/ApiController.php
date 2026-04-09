<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\AdviceRequest;
use App\Http\Requests\Api\ConfirmTaskRequest;
use App\Http\Requests\Api\IntroductionRequest;
use App\Http\Requests\Api\MindsetRequest;
use App\Http\Requests\Api\ObstaclesRequest;
use App\Models\Conversation;
use Prism\Prism\Contracts\Schema;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Schema\AnyOfSchema;
use Prism\Prism\Schema\ArraySchema;
use Prism\Prism\Schema\EnumSchema;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;
use Prism\Prism\ValueObjects\Messages\SystemMessage;
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
                We are meeting a new user, and are getting their communication preferences.
                TEXT
            )
            ->withPrompt(<<<TEXT
                Create personalised messages for a user named {$request->input('name')}.
                Be warm and personable.
                TEXT
            )
            ->asStructured()
        ;

        $conversation = Conversation::createForName(
            $request->input( 'name' )
        );

        return response()->json([
            ...$response->structured,
            'conversation_id' => $conversation->id,
        ]);
    }

    public function mindset( MindsetRequest $request, Conversation $conversation )
    {
        $schema = new ObjectSchema(
            name: 'mindset_request',
            description: "A set of more detailed questions designed to understand a user's state of mind",
            properties: [
                new StringSchema( 'intro_objective', <<<TEXT
                    Thank the user for telling you how they feel.
                    Finish by asking them if they have a task in mind.
                    TEXT
                ),
                new StringSchema( 'response_has_task', <<<TEXT
                    A response to the user when they tell you they have a task in mind.
                    Be supportive and encouraging. Finish by asking them what the task is.
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

        $messages = [
            new SystemMessage(<<<TEXT
                We are trying to understand the nature of a task the user wants to complete.
                They are about to tell us their state of mind, and how they feel.
                Be mindful of their current state of mind when addressing them, and be sure to acknowledge how they feel in your responses.
                Include a few sentences of encouragement and smalltalk at the start of your response.
                TEXT
            ),
            ...$conversation->getContext(),
            new UserMessage(<<<TEXT
                My state of mind is "{$request->input('mindset')}".
                Make sure you communicate with me with this in mind. It's important.
                TEXT
            )
        ];

        $response = $this->askModel( $schema )
            ->withMessages( $messages )
            ->asStructured()
        ;

        $conversation->addContext(
            new UserMessage( "My state of mind is '{$request->input('mindset')}'." ),
            true
        );

        return response()->json(
            $response->structured
        );
    }

    public function identifyObjective()
    {

    }

    public function confirmObjective( ConfirmTaskRequest $request, Conversation $conversation )
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
                        $this->needMoreInformationSchema(),
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
                                    You should also include reference to the subtask items.
                                    This should be as enthusiastic or supportive as possible, in line with their communication style.
                                    Do not address solutions yet.

                                    Finish by asking them what obstacles or blockers might prevent them from completing the objective.
                                    Example: "...What do you think is preventing you from completing the task?"
                                    TEXT
                                ),
                                new StringSchema(
                                    'objective_llm_instuction', <<<TEXT
                                    Summarise the user's objective in a few paragraphs, from their point of view.
                                    Include information about the subtasks, and how they will be completed.
                                    This will be used in future LLM tasks, so should be as informative as possible.
                                    It does not need formatting for the user to read, this is for other language models.
                                    It should start "I am going to..."
                                    TEXT
                                ),
                                new ArraySchema(
                                    name: 'objective_subtasks',
                                    description: 'A list of subtasks that the user wants to complete to reach their objective',
                                    items: new ObjectSchema(
                                        name: 'subtask_item',
                                        description: 'A single objective subtask item',
                                        properties: [
                                            new StringSchema(
                                                name: 'subtask_title',
                                                description: 'The title of the subtask'
                                            ),
                                            new StringSchema(
                                                name: 'subtask_description',
                                                description: 'A brief description of the subtask, explaining what needs to be done, and why it is important'
                                            ),
                                        ],
                                        requiredFields: [
                                            'subtask_title',
                                            'subtask_description'
                                        ]
                                    ),
                                    minItems: 3,
                                    maxItems: 10,
                                )
                            ],
                            requiredFields: [
                                'objective_title',
                                'response_to_user',
                                'objective_llm_instuction',
                                'objective_subtasks'
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

        $messages = [
            new SystemMessage(<<<TEXT
                We are trying to understand the nature of a task the user wants to complete.
                Be mindful of their current state of mind when addressing them, and be sure to acknowledge how they feel in your responses.
                Include a few sentences of encouragement and smalltalk at the start of your response.
                The task should be reasonably well defined. If it's too vague, ask for more information.
                You should also try to identify some important aspects of the task to be defined as subtasks.
                Push for more information on the subtasks if they're too vague.
                If you need more information from the user, ask them to provide it using the 'need_more_information' schema response.
                Try not to have the conversation go on unnecessarily, though.
                Only try to identify the objective, don't address obstacles or worries yet.
                Shape your response according to the communication styles so far.
                TEXT
            ),
            ...$conversation->getContext(),
            ...$this->mapConversationFromRequest(
                $request->input( 'conversation' )
            ),
        ];


        $response = $this->askModel( $schema )
            ->withMessages( $messages )
            ->asStructured()
        ;

        if( $response->structured[ 'result' ] === 'confirmed' ) {
            $instruction = $response->structured[ 'objective' ][ 'objective_llm_instuction' ];
            $conversation->addContext(
                new UserMessage( $instruction ),
                true
            );
        }

        return response()->json(
            $response->structured
        );

    }

    public function obstacles( ObstaclesRequest $request, Conversation $conversation )
    {
        $schema = new ObjectSchema(
            name: 'obstacles_confirmed',
            description: "A response confirming the obstacles and worries the user has about their objective",
            properties: [
                new EnumSchema(
                    'result',
                    "Whether the obstacles the user sees have been confirmed, or whether more information is needed",
                    [ 'confirmed', 'need_more_information' ]
                ),
                new AnyOfSchema(
                    schemas: [
                        $this->needMoreInformationSchema(),
                        new ObjectSchema(
                            name: 'obstacles_confirmed',
                            description: 'A response confirming the user\'s obstacles to their objective',
                            properties: [
                                new StringSchema(
                                    name: 'obstacles_summary',
                                    description: 'A brief summary of the user\'s obstacles to their objective, as concise as possible'
                                ),
                                new StringSchema(
                                    name: 'response_to_user',
                                    description: <<<TEXT
                                        A response to the user, confirming that the obstacles to their objective have been received and understood.
                                        This should be as understanding or supportive as possible, in line with their communication style.
                                        TEXT
                                ),
                                new StringSchema(
                                    name: 'obstacles_llm_instuction',
                                    description: <<<TEXT
                                        Summarise the user's obstacles in a paragraph or two, from their point of view.
                                        This will be used in future LLM tasks, so should be as descriptive and informative as possible.
                                        It should start "I am concerned..."
                                        TEXT
                                ),
                                new ArraySchema(
                                    name: 'advice_personas',
                                    description: <<<TEXT
                                        A list of personas through which to offer advice to the user.
                                        These should be as related to the subject at hand as possible, whilst also covering a wide range of perspectives and advisor types.
                                        For example, one persona could be more solutions-oriented, whilst another could be more empathetic.
                                        Aim to provide 3-5 different personas.
                                        TEXT,
                                    items: new ObjectSchema(
                                        name: 'advice_persona',
                                        description: 'A persona through which to offer advice to the user. Avoid stereotypes, especially offensive ones.',
                                        properties: [
                                            new StringSchema(
                                                name: 'persona_name',
                                                description: <<<TEXT
                                                    The name of the persona, e.g. "Best Friend", "Kindly Mentor", "Drill Sergeant".
                                                    Be creative here, but avoid anything racial, sexual or offensive.
                                                    TEXT
                                            ),
                                            new StringSchema(
                                                name: 'persona_advice_style',
                                                description: <<<TEXT
                                                    The advice style of the persona, e.g. "Caring and heartfelt", "Strict, but tough love", "Evidence-based and practical".
                                                    TEXT
                                            ),
                                            new StringSchema(
                                                name: 'persona_description',
                                                description: <<<TEXT
                                                    A brief description of the persona, explaining a little about their background and personality,
                                                    and how their perspective will affect the advice they provide. Be creative here.
                                                    Keep them concise, leading with the information. No need to start with things like 'This persona...'
                                                    TEXT
                                            ),
                                            new StringSchema(
                                                name: 'llm_instruction',
                                                description: <<<TEXT
                                                    Summarise the persona and how they would give advice to the user. This will only be used in future LLM tasks,
                                                    so there is no need to format it for the user - explain it as you would to another language model.
                                                    This can also include information about speech style, tone of voice, characterisation, etc.
                                                    TEXT
                                            )
                                        ],
                                        requiredFields: [
                                            'persona_name',
                                            'persona_advice_style',
                                            'persona_description',
                                            'llm_instruction'
                                        ]
                                    ),
                                    minItems: 3,
                                    maxItems: 5,
                                )
                            ],
                            requiredFields: [
                                'obstacles_summary',
                                'response_to_user',
                                'obstacles_llm_instuction',
                                'advice_personas'
                            ]
                        )
                    ],
                    name: 'obstacles'
                )
            ],
            requiredFields: [
                'result',
                'obstacles'
            ]
        );

        $messages = [
            new SystemMessage(<<<TEXT
                We are trying to understand the barriers to completing the user's objective,
                Especially those that are mental or psychological in nature.
                Include a few sentences of encouragement and smalltalk at the start of your response.
                The obstacles should be reasonably well defined. If they're too vague, ask for more information.
                If you need more information from the user, ask them to provide it using the 'need_more_information' schema response.
                Only try to identify the obstacles, don't address solutions yet.
                Shape your response according to the communication styles so far.
                TEXT
            ),
            ...$conversation->getContext(),
            ...$this->mapConversationFromRequest(
                $request->input( 'conversation' )
            )
        ];

        $response = $this->askModel( $schema )
            ->withMessages( $messages )
            ->asStructured()
        ;

        if( $response->structured[ 'result' ] === 'confirmed' ) {
            $instruction = $response->structured[ 'obstacles' ][ 'obstacles_llm_instuction' ];
            $conversation->addContext(
                new UserMessage( $instruction ),
                true
            );
        }


        return response()->json(
            $response->structured
        );
    }

    public function advice( AdviceRequest $request, Conversation $conversation )
    {
        $schema = new ObjectSchema(
            name: 'advice_to_user',
            description: 'A detailed response to the user, in the specified persona, with advice on how to complete their objective',
            properties: [
                new StringSchema(
                    name: 'action_plan_title',
                    description: 'A catchy name for the action plan. Use humour and personality where appropriate.'
                ),
                new StringSchema(
                    name: 'action_plan_description',
                    description: <<<TEXT
                        A detailed description of at least two paragraphs, outlining the plan and how it's specifically
                        tailored to the user's situation. This should be as detailed as possible.
                        Use humour and personality where appropriate.
                        TEXT
                ),
                new ArraySchema(
                    name: 'action_plan_steps',
                    description: 'A list of specific steps that the user should take to complete their objective',
                    items: new ObjectSchema(
                        name: 'action_plan_step',
                        description: 'A single step in the action plan',
                        properties: [
                            new StringSchema(
                                name: 'step_title',
                                description: 'The title of this step in the plan'
                            ),
                            new StringSchema(
                                name: 'step_description',
                                description: 'A detailed description of the step, explaining what needs to be done, and why it\'s important'
                            )
                        ],
                        requiredFields: [
                            'step_title',
                            'step_description'
                        ]
                    ),
                    minItems: 3,
                    maxItems: 10
                )
            ],
            requiredFields: [
                'action_plan_title',
                'action_plan_description',
                'action_plan_steps'
            ]
        );

        $messages = [
            new SystemMessage(<<<TEXT
                We are now ready to provide advice to the user. We've identified the obstacles and worries they are facing,
                and now need to provide them with a plan of action to overcome them. Tailor your advice through the lens of the
                chosen persona, doing your best to provide a solution that is both practical and effective.
                TEXT
            ),
            new SystemMessage(<<<TEXT
                You should answer as the following persona: {$request->input('persona')}.
                TEXT
            ),
            ...$conversation->getContext(),
            new AssistantMessage(<<<TEXT
                So, here is my advice...
                TEXT
            )
        ];

        $response = $this->askModel( $schema )
            ->withMessages( $messages )
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
                Always refer to the user by name, never 'the user' or 'user'. Unless speaking as them in the first person.
                TEXT
            )
        ;
    }

    protected function needMoreInformationSchema()
    {
        return new ObjectSchema(
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
        );
    }

    protected function mapConversationFromRequest( array $conversation )
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
