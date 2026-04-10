<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class PromptSetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'      => 'required|string|max:255|unique:prompt_sets,name,' . ($this->prompt_set?->id ?? 'NULL'),
            'version'   => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}
