<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('books')->insert([
            [
                'title' => 'Laskar Pelangi',
                'description' => 'Kisah perjuangan anak-anak Belitung meraih pendidikan.',
                'price' => 85000,
                'stock' => 20,
                'cover_photo' => null,
                'genre_id' => 1,
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Bumi',
                'description' => 'Petualangan Raib, Seli, dan Ali di dunia paralel.',
                'price' => 95000,
                'stock' => 15,
                'cover_photo' => null,
                'genre_id' => 5,
                'author_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Perahu Kertas',
                'description' => 'Kisah Kugy dan Keenan mengejar impian.',
                'price' => 90000,
                'stock' => 12,
                'cover_photo' => null,
                'genre_id' => 3,
                'author_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Bumi Manusia',
                'description' => 'Kisah Minke dalam masa kolonial Hindia Belanda.',
                'price' => 100000,
                'stock' => 10,
                'cover_photo' => null,
                'genre_id' => 1,
                'author_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Lelaki Harimau',
                'description' => 'Novel tentang tragedi dan kehidupan masyarakat.',
                'price' => 78000,
                'stock' => 8,
                'cover_photo' => null,
                'genre_id' => 1,
                'author_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}