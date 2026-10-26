<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('genres')->insert([
            [
                'name' => 'Fiksi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nonfiksi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Romance',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Misteri',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fantasi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}