<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('authors')->insert([
            [
                'name' => 'Andrea Hirata',
                'photo' => null,
                'bio' => 'Penulis novel Laskar Pelangi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tere Liye',
                'photo' => null,
                'bio' => 'Penulis novel Indonesia.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dee Lestari',
                'photo' => null,
                'bio' => 'Penulis novel dan penyanyi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pramoedya Ananta Toer',
                'photo' => null,
                'bio' => 'Sastrawan Indonesia.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Eka Kurniawan',
                'photo' => null,
                'bio' => 'Penulis novel Indonesia.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}