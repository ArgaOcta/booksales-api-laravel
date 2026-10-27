<?php

namespace App\Http\Controllers;

use App\Models\Author;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::with('books')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar penulis berhasil diambil.',
            'data' => $authors
        ], 200);
    }
}