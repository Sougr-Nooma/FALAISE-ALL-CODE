<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prix',
        'categorie',
        'type',
        'description',
        'photo_path',
        'is_specialite',
    ];

    protected $casts = [
        'is_specialite' => 'boolean',
        'prix' => 'decimal:2',
    ];

    // Scopes
    public function scopeMenu($query)
    {
        return $query->where('is_specialite', false);
    }

    public function scopeSpecialites($query)
    {
        return $query->where('is_specialite', true);
    }
}