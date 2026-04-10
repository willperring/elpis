<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prompt_definitions', function (Blueprint $table) {
            $table->id();
            $table->string('group');
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('prompt_sets', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('version')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });

        Schema::create('prompts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prompt_definition_id')->constrained()->onDelete('cascade');
            $table->foreignId('prompt_set_id')->constrained()->onDelete('cascade');
            $table->text('content');
            $table->timestamps();

            $table->unique(['prompt_definition_id', 'prompt_set_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prompts');
        Schema::dropIfExists('prompt_sets');
        Schema::dropIfExists('prompt_definitions');
    }
};
