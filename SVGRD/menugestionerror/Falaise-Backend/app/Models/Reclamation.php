<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    //
    $table->string('nom')->nullable();
    $table->string('telephone')->nullable();
    $table->string('email')->nullable();
    $table->string('source');
    $table->text('message');
    $table->string('status')->default('nouveau');
    $table->string('photo_path')->nullable();
}
