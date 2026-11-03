<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    // Read all transactions (Admin)
    public function index()
    {
        $transactions = Transaction::with(['user', 'book'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar transaksi berhasil diambil.',
            'data' => $transactions
        ], 200);
    }

    // Create transaction (Customer)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
            'quantity' => ['required', 'integer', 'min:1']
        ]);

        $book = Book::findOrFail($validated['book_id']);

        $transaction = Transaction::create([
            'order_number' => 'TRX-' . strtoupper(Str::random(10)),
            'user_id' => $request->user()->id,
            'book_id' => $book->id,
            'quantity' => $validated['quantity'],
            'total_price' => $book->price * $validated['quantity'],
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil ditambahkan.',
            'data' => $transaction->load(['user', 'book'])
        ], 201);
    }

    // Show transaction detail (Customer)
    public function show(Request $request, string $id)
    {
        $transaction = Transaction::with(['user', 'book'])
            ->where('user_id', $request->user()->id)
            ->find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail transaksi berhasil diambil.',
            'data' => $transaction
        ], 200);
    }

    // Update transaction (Customer)
    public function update(Request $request, string $id)
    {
        $transaction = Transaction::where('user_id', $request->user()->id)
            ->find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi tidak ditemukan.'
            ], 404);
        }

        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
            'quantity' => ['required', 'integer', 'min:1']
        ]);

        $book = Book::findOrFail($validated['book_id']);

        $transaction->update([
            'book_id' => $book->id,
            'quantity' => $validated['quantity'],
            'total_price' => $book->price * $validated['quantity']
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil diperbarui.',
            'data' => $transaction->load(['user', 'book'])
        ], 200);
    }

    // Delete transaction (Admin)
    public function destroy(string $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi tidak ditemukan.'
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil dihapus.'
        ], 200);
    }
}