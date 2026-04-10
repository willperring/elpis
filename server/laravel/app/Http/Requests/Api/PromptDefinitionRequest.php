<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class PromptDefinitionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'group'       => 'required|string|max:255',
            'name'        => 'required|string|max:255|unique:prompt_definitions,name,' . ($this->prompt_definition?->id ?? 'NULL'),
            'description' => 'nullable|string',
        ];
    }
}
