<?php

namespace App\Http\Controllers;

use App\Models\Genre;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::with('books')->get();

        return view('genres.index', compact('genres'));
    }
}