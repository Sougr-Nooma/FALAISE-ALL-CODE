<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\Environment\Console;

class DishController extends Controller
{
    // Liste tous les plats (menu + spécialités)
    public function index(Request $request)
    {
        $query = Dish::query();

        // Filtre par type (menu ou specialite)
        if ($request->has('type')) {
            if ($request->type === 'menu') {
                $query->menu();
            } elseif ($request->type === 'specialites') {
                $query->specialites();
            }
        }

        // Filtre par catégorie (uniquement pour menu)
        if ($request->has('categorie') && $request->categorie !== 'all') {
            $query->where('categorie', $request->categorie);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    // Créer un plat ou spécialité
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'nom' => 'required|string',
    //         'is_specialite' => 'required|boolean',
    //         'prix' => 'nullable|required_if:is_specialite,false|numeric',
    //         'categorie' => 'nullable|required_if:is_specialite,false|string',
    //         'type' => 'nullable|string',
    //         'description' => 'nullable|string',
    //         'photo' => 'nullable|image|max:2048',
    //     ]);

    //     // Gestion photo pour spécialités
    //     if ($request->hasFile('photo')) {
    //         $path = $request->file('photo')->store('specialites', 'public');
    //         $validated['photo_path'] = $path;
    //     }

    //     unset($validated['photo']);

    //     $dish = Dish::create($validated);

    //     return $dish;
    // }
    public function store(Request $request)
    {
        // Console.Log::info('Données reçues:', $request->all());
        // \Log::info('Fichier photo:', [$request->file('photo')]);

        $validated = $request->validate([
            'nom' => 'required|string',
            'is_specialite' => 'required|in:0,1', // Accepte plusieurs formats
            // 'is_specialite' => 'required|boolean',
            // 'prix' => 'nullable|required_if:is_specialite,0,false|numeric|min:0',
            'prix' => 'nullable|required_if:is_specialite,false|numeric',
            // 'categorie' => 'nullable|required_if:is_specialite,0,false|string',
            'categorie' => 'nullable|required_if:is_specialite,false|string',
            'type' => 'nullable|string',
            'description' => 'nullable|string',
            'photo' => 'nullable|required_if:is_specialite,1,true|image|max:10240',
        ]);

        // Convertir is_specialite en boolean
        $validated['is_specialite'] = in_array($request->is_specialite, [1, '1', true, 'true'], true);
        // $validated['is_specialite'] = filter_var($request->is_specialite, FILTER_VALIDATE_BOOLEAN);
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('specialites', 'public');
            $validated['photo_path'] = $path;
        }

        unset($validated['photo']);

        $dish = Dish::create($validated);

        return $dish;
    }

    public function show(Dish $dish)
    {
        return $dish;
    }

    public function update(Request $request, Dish $dish)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string',
            'prix' => 'nullable|numeric',
            'categorie' => 'nullable|string',
            'type' => 'nullable|string',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            // Supprimer ancienne photo
            if ($dish->photo_path) {
                Storage::disk('public')->delete($dish->photo_path);
            }
            $path = $request->file('photo')->store('specialites', 'public');
            $validated['photo_path'] = $path;
        }

        unset($validated['photo']);

        $dish->update($validated);

        return $dish;
    }

    public function destroy(Dish $dish)
    {
        // Supprimer photo si existe
        if ($dish->photo_path) {
            Storage::disk('public')->delete($dish->photo_path);
        }

        $dish->delete();

        return response()->noContent();
    }
}