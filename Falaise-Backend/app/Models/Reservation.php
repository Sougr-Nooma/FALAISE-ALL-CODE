<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'nom',
        'telephone',
        'email',
        'date',
        'heure',
        'personnes',
        'remarques',
        'status',
    ];
    
}

