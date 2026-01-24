<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function index()
    {
        return Dish::orderBy('category')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom'         => 'required|string|max:255',
            'categorie'   => 'required|string|max:255',
            'prix'        => 'required|numeric|min:0',
            'type'        => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $dish = Dish::create($request->all());
        return response()->json($dish, 201);
    }

    public function update(Request $request, Dish $dish)
    {
        $dish->update($request->validate([
            'nom'         => 'sometimes|string|max:255',
            'categorie'   => 'sometimes|string|max:255',
            'prix'        => 'sometimes|numeric|min:0',
            'type'        => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]));
        return $dish;
    }

    public function destroy(Dish $dish)
    {
        $dish->delete();
        return response()->noContent();
    }
}