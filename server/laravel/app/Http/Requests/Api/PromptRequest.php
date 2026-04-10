<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class PromptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prompt_definition_id' => 'required|exists:prompt_definitions,id',
            'prompt_set_id'        => 'required|exists:prompt_sets,id',
            'content'              => 'required|string',
        ];
    }
}
