<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;

// Books - Read All (Public)
Route::get('/books', [BookController::class, 'index']);

// Author - Read All dan Show (Public)
Route::apiResource('authors', AuthorController::class)
    ->only(['index', 'show']);

// Genre - Read All dan Show (Public)
Route::apiResource('genres', GenreController::class)
    ->only(['index', 'show']);

// Author dan Genre - Create, Update, Destroy (Admin Only)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::apiResource('authors', AuthorController::class)
        ->only(['store', 'update', 'destroy']);

    Route::apiResource('genres', GenreController::class)
        ->only(['store', 'update', 'destroy']);

});