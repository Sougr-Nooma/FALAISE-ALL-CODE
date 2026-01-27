<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GalleryItem extends Model
{
    use HasFactory;

    //
    protected $fillable = [
        'titre',
        'description',
        'type',
        'file_path',
        'thumbnail_path',
        'video_url',
        'ordre',
        'active',
        'status',
    ];
}
