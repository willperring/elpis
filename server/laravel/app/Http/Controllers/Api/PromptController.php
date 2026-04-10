<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PromptRequest;
use App\Models\Prompt;
use Illuminate\Http\JsonResponse;

class PromptController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Prompt::with(['definition', 'set'])->get());
    }

    public function store(PromptRequest $request): JsonResponse
    {
        $prompt = Prompt::updateOrCreate(
            $request->only(['prompt_definition_id', 'prompt_set_id']),
            $request->only(['content'])
        );
        return response()->json($prompt, 201);
    }

    public function show(Prompt $prompt): JsonResponse
    {
        return response()->json($prompt->load(['definition', 'set']));
    }

    public function update(PromptRequest $request, Prompt $prompt): JsonResponse
    {
        $prompt->update($request->validated());
        return response()->json($prompt);
    }

    public function destroy(Prompt $prompt): JsonResponse
    {
        $prompt->delete();
        return response()->json(null, 204);
    }
}
