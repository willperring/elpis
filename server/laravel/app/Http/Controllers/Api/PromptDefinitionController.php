<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PromptDefinitionRequest;
use App\Models\PromptDefinition;
use Illuminate\Http\JsonResponse;

class PromptDefinitionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(PromptDefinition::all());
    }

    public function store(PromptDefinitionRequest $request): JsonResponse
    {
        $definition = PromptDefinition::create($request->validated());
        return response()->json($definition, 201);
    }

    public function show(PromptDefinition $prompt_definition): JsonResponse
    {
        return response()->json($prompt_definition);
    }

    public function update(PromptDefinitionRequest $request, PromptDefinition $prompt_definition): JsonResponse
    {
        $prompt_definition->update($request->validated());
        return response()->json($prompt_definition);
    }

    public function destroy(PromptDefinition $prompt_definition): JsonResponse
    {
        $prompt_definition->delete();
        return response()->json(null, 204);
    }
}
