<?php

namespace App\Models;

class Author
{
    public static function all(): array
    {
        return [
            ['id' => 1, 'name' => 'Andrea Hirata'],
            ['id' => 2, 'name' => 'Tere Liye'],
            ['id' => 3, 'name' => 'Dee Lestari'],
            ['id' => 4, 'name' => 'Pramoedya Ananta Toer'],
            ['id' => 5, 'name' => 'Eka Kurniawan'],
        ];
    }
}
