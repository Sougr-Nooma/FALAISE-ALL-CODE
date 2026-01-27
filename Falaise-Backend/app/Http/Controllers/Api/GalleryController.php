<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        return GalleryItem::where('active', true)
            ->orderBy('ordre', 'asc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'file' => 'required|file|mimes:jpg,jpeg,png,mp4,webm|max:51200', // 50Mo
            'video_url' => 'nullable|url',
        ]);

        // Upload fichier
        $path = $request->file('file')->store('gallery', 'public');
        
        // Créer miniature si vidéo (optionnel, nécessite FFmpeg)
        $thumbnailPath = null;
        if ($validated['type'] === 'video') {
            $thumbnailPath = $this->generateThumbnail($path);
        }

        $item = GalleryItem::create([
            'titre' => $validated['titre'],
            'description' => $validated['description'],
            'type' => $validated['type'],
            'file_path' => $path,
            'thumbnail_path' => $thumbnailPath,
            'video_url' => $validated['video_url'] ?? null,
            'ordre' => GalleryItem::max('ordre') + 1,
        ]);

        return $item;
    }

    public function update(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);
        $item->update($request->only(['titre', 'description', 'active', 'ordre']));
        return $item;
    }

    public function destroy($id)
    {
        $item = GalleryItem::findOrFail($id);
        
        // Supprimer fichiers
        Storage::disk('public')->delete($item->file_path);
        if ($item->thumbnail_path) {
            Storage::disk('public')->delete($item->thumbnail_path);
        }
        
        $item->delete();
        return response()->noContent();
    }

    // Génération miniature vidéo (optionnel)
    private function generateThumbnail($videoPath)
    {
        // Nécessite FFmpeg installé sur serveur
        // Pour l'instant, retourne null ou image par défaut
        return null;
    }
}