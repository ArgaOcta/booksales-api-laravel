<?php

namespace App\Models;

class Genre
{
    public static function all(): array
    {
        return [
            ['id' => 1, 'name' => 'Fiksi'],
            ['id' => 2, 'name' => 'Nonfiksi'],
            ['id' => 3, 'name' => 'Romance'],
            ['id' => 4, 'name' => 'Misteri'],
            ['id' => 5, 'name' => 'Fantasi'],
        ];
    }
}

