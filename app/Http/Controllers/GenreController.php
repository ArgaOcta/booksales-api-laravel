<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    // Read all data genre
    public function index()
    {
        $genres = Genre::with('books')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar genre berhasil diambil.',
            'data' => $genres
        ], 200);
    }

    // Create data genre
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255']
        ]);

        $genre = Genre::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Genre berhasil ditambahkan.',
            'data' => $genre
        ], 201);
    }
}