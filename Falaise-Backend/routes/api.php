<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReclamationController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\DishController;
use App\Http\Controllers\Api\GalleryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/



// Groupe avec middleware API (CORS automatique si configuré)
Route::middleware(['api'])->group(function () {
    
    // Réclamations
    Route::apiResource('reclamations', ReclamationController::class);

    // Réservation
    Route::apiResource('reservations', ReservationController::class);

    //blogs
    Route::apiResource('gallery', GalleryController::class);

    // gestion carte/spécialités
    Route::apiResource('dishes', DishController::class);

    
    // Route de test (pour vérifier que l'API fonctionne)
    Route::get('/test', function () {
        return ['message' => 'API La Falaise fonctionne !'];
    });
    
});

// Route OPTIONS pour preflight CORS (automatique avec fruitcake)
Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::apiResource('reclamations', ReclamationController::class);