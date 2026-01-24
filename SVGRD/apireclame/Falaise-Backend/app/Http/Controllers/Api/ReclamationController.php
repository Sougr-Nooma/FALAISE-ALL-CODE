<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reclamation;
use Illuminate\Support\Facades\Mail;


class ReclamationController extends Controller
{
    public function index()
    {
        return Reclamation::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'nullable|string',
            'telephone' => 'nullable|string',
            'email' => 'nullable|email',
            'source' => 'required|in:COMPTOIRE,CUISINE,CHICHA,EMPLOYE',
            'message' => 'required|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('reclamations', 'public');
            $validated['photo_path'] = $path;
        }

        unset($validated['photo']);
        $reclamation = Reclamation::create($validated);

        // Email
        $photoUrl = $reclamation->photo_path 
            ? asset('storage/' . $reclamation->photo_path) 
            : 'Aucune photo';

        Mail::raw(
            "Nouvelle réclamation - La Falaise\n\n" .
            "Source: {$reclamation->source}\n" .
            "Nom: " . ($reclamation->nom ?: 'Anonyme') . "\n" .
            "Téléphone: " . ($reclamation->telephone ?: '-') . "\n" .
            "Email: " . ($reclamation->email ?: '-') . "\n\n" .
            "Message:\n{$reclamation->message}\n\n" .
            "Photo: {$photoUrl}",
            function ($message) {
                $message->to('admin@lafalaise.com')
                        ->subject('🔔 Nouvelle réclamation - La Falaise');
            }
        );

        return $reclamation;
    }

    public function update(Request $request, Reclamation $reclamation)
    {
        $reclamation->update(['status' => $request->status]);
        return $reclamation;
    }
}