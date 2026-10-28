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
}