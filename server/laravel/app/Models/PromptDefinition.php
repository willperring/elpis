<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PromptDefinition extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'name',
        'description',
    ];

    public function prompts(): HasMany
    {
        return $this->hasMany(Prompt::class);
    }
}
