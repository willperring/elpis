<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Prism\Prism\Contracts\Message;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;
use Prism\Prism\ValueObjects\Messages\SystemMessage;
use Prism\Prism\ValueObjects\Messages\UserMessage;

class Conversation extends Model
{
    /** @use HasFactory<\Database\Factories\ConversationFactory> */
    use HasFactory;
    use HasUuids;

    public static function createForName( string $name )
    {
        $conversation = self::create([
            'conversation' => [ 'name' => $name ],
            'context'      => [],
        ]);

        $conversation->addContext(
            new UserMessage( "Hi, my name is {$name}." ),
            true
        );

        return $conversation;
    }

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'conversation',
        'context'
    ];

    protected $casts = [
        'conversation' => 'array',
        'context'      => 'array'
    ];

    public function addContext( $context, bool $andSave=false )
    {
        $this->context = [ ...$this->context,
            $this->prepareContext( $context )
        ];

        if( $andSave ) $this->save();

        return $this;
    }

    public function getContext()
    {
        $array = array_map(
            fn( $context ) => $this->inflateContext( $context ),
            $this->context
        );

        $array = array_filter( $array );
        return array_values( $array );
    }

    protected function prepareContext( $context )
    {
        if( class_implements($context, Message::class) ) {
            return array_intersect_key( $context->toArray(),
                array_flip([ 'type', 'content' ])
            );
        }

        return $context;
    }

    protected function inflateContext( $context )
    {
        return match( $context[ 'type' ] ) {
            'user'      => new UserMessage( $context[ 'content' ] ),
            'assistant' => new AssistantMessage( $context[ 'content' ] ),
            'system'    => new SystemMessage( $context[ 'content' ] ),
            default     => null,
        };
    }

}
