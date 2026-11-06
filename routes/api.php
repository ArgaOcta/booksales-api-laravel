<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\RegisterController;

// Books - Public
Route::get('/books', [BookController::class, 'index']);

// Authors - Public (Read All dan Show)
Route::apiResource('authors', AuthorController::class)
    ->only(['index', 'show']);

// Genres - Public (Read All dan Show)
Route::apiResource('genres', GenreController::class)
    ->only(['index', 'show']);

// Authors dan Genres - Admin Only
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::apiResource('authors', AuthorController::class)
        ->only(['store', 'update', 'destroy']);

    Route::apiResource('genres', GenreController::class)
        ->only(['store', 'update', 'destroy']);

});

// Transactions - Customer Only
Route::middleware(['auth:sanctum', 'customer'])->group(function () {

    Route::apiResource('transactions', TransactionController::class)
        ->only(['store', 'show', 'update']);

});

// Transactions - Admin Only
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::apiResource('transactions', TransactionController::class)
        ->only(['index', 'destroy']);

});

Route::post('/register', [RegisterController::class, 'register']);