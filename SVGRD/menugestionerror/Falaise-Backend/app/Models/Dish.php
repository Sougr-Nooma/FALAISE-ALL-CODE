<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    // colonnes remplissables en masse
    protected $fillable = [
        'nom',
        'type',
        'categorie',
        'prix',
        'description',
    ];

    // cast du prix en decimal (8,2)
    protected $casts = [
        'prix' => 'decimal:2',
    ];
}