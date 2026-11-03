<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'order_number',
        'user_id',
        'book_id',
        'quantity',
        'total_price',
        'status',
    ];

    // Relasi transaksi dengan customer
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi transaksi dengan buku
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}