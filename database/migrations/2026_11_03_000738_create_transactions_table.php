<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();

            // Relasi ke tabel users (customer)
            $table->foreignId('user_id')->constrained('users');

            // Relasi ke tabel books
            $table->foreignId('book_id')->constrained('books');

            $table->unsignedInteger('quantity');
            $table->decimal('total_price', 10, 2);
            $table->string('status')->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};