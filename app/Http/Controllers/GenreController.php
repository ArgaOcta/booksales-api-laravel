<?php

namespace App\Http\Controllers;

use App\Models\Genre;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::with('books')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar genre berhasil diambil.',
            'data' => $genres
        ], 200);
    }
}