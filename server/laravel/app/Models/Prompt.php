<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prompt extends Model
{
    use HasFactory;

    protected $fillable = [
        'prompt_definition_id',
        'prompt_set_id',
        'content',
    ];

    public function definition(): BelongsTo
    {
        return $this->belongsTo(PromptDefinition::class, 'prompt_definition_id');
    }

    public function set(): BelongsTo
    {
        return $this->belongsTo(PromptSet::class, 'prompt_set_id');
    }

    public static function getActive(string $name): ?string
    {
        $activeSet = PromptSet::active();

        if (!$activeSet) {
            return null;
        }

        return self::where('prompt_set_id', $activeSet->id)
            ->whereHas('definition', function ($query) use ($name) {
                $query->where('name', $name);
            })
            ->value('content');
    }
}
