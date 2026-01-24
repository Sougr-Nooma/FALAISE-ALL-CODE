<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //
    $table->string('path');
    $table->string('legende')->nullable();
}
