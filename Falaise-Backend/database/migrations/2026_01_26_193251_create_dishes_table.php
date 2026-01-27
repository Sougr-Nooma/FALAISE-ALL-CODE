<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('prix', 8, 2)->nullable(); // null pour spécialités
            $table->string('categorie')->nullable(); // null pour spécialités
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->string('photo_path')->nullable(); // pour spécialités
            $table->boolean('is_specialite')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dishes');
    }
};