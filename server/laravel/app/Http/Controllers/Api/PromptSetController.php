<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PromptSetRequest;
use App\Models\PromptSet;
use Illuminate\Http\JsonResponse;

class PromptSetController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(PromptSet::all());
    }

    public function store(PromptSetRequest $request): JsonResponse
    {
        $set = PromptSet::create($request->validated());
        return response()->json($set, 201);
    }

    public function show(PromptSet $prompt_set): JsonResponse
    {
        return response()->json($prompt_set);
    }

    public function update(PromptSetRequest $request, PromptSet $prompt_set): JsonResponse
    {
        $prompt_set->update($request->validated());
        return response()->json($prompt_set);
    }

    public function destroy(PromptSet $prompt_set): JsonResponse
    {
        $prompt_set->delete();
        return response()->json(null, 204);
    }

    public function activate(PromptSet $prompt_set): JsonResponse
    {
        PromptSet::where('is_active', true)->update(['is_active' => false]);
        $prompt_set->update(['is_active' => true]);
        return response()->json($prompt_set);
    }
}
