<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('dishes', \App\Http\Controllers\Api\DishController::class);


