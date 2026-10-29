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

    // Show detail genre
    public function show(string $id)
    {
        $genre = Genre::with('books')->find($id);

        if (!$genre) {
            return response()->json([
                'success' => false,
                'message' => 'Genre tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail genre berhasil diambil.',
            'data' => $genre
        ], 200);
    }

    // Update data genre
    public function update(Request $request, string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'success' => false,
                'message' => 'Genre tidak ditemukan.'
            ], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255']
        ]);

        $genre->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Genre berhasil diperbarui.',
            'data' => $genre
        ], 200);
    }

    // Delete data genre
    public function destroy(string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'success' => false,
                'message' => 'Genre tidak ditemukan.'
            ], 404);
        }

        $genre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Genre berhasil dihapus.'
        ], 200);
    }
}