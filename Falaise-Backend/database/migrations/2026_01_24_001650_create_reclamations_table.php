<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     public function up(): void
//     {
//         Schema::create('reclamations', function (Blueprint $table) {
//             $table->id();
//             $table->string('nom')->nullable();
//             $table->string('telephone')->nullable();
//             $table->string('email')->nullable();
//             $table->string('source'); // COMPTOIRE, CUISINE, CHICHA, EMPLOYE
//             $table->text('message');
//             $table->string('photo_path')->nullable();
//             $table->string('status')->default('nouveau'); // nouveau, traité, archivé
//             $table->timestamps();
//         });
//     }

//     public function down(): void
//     {
//         Schema::dropIfExists('reclamations');
//     }
// };

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable();
            $table->string('telephone')->nullable();
            $table->string('email')->nullable();
            $table->string('source');
            $table->text('message');
            $table->string('photo_path')->nullable();
            $table->string('status')->default('nouveau');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamations');
    }
};