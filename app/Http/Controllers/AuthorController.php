<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    // Read all data author
    public function index()
    {
        $authors = Author::with('books')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar penulis berhasil diambil.',
            'data' => $authors
        ], 200);
    }

    // Create data author
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string']
        ]);

        $author = Author::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Penulis berhasil ditambahkan.',
            'data' => $author
        ], 201);
    }

    // Show detail author
    public function show(string $id)
    {
        $author = Author::with('books')->find($id);

        if (!$author) {
            return response()->json([
                'success' => false,
                'message' => 'Penulis tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail penulis berhasil diambil.',
            'data' => $author
        ], 200);
    }

    // Update data author
    public function update(Request $request, string $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'success' => false,
                'message' => 'Penulis tidak ditemukan.'
            ], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string']
        ]);

        $author->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Penulis berhasil diperbarui.',
            'data' => $author
        ], 200);
    }

    // Delete data author
    public function destroy(string $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'success' => false,
                'message' => 'Penulis tidak ditemukan.'
            ], 404);
        }

        $author->delete();

        return response()->json([
            'success' => true,
            'message' => 'Penulis berhasil dihapus.'
        ], 200);
    }
}