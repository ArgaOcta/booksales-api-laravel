<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Buku</title>
</head>
<body>
    <h1>Daftar Buku</h1>

    <nav>
        <a href="{{ route('books.index') }}">Buku</a> |
        <a href="{{ route('authors.index') }}">Penulis</a> |
        <a href="{{ route('genres.index') }}">Genre</a>
    </nav>

    <hr>

    @forelse ($books as $book)
        <article>
            <h2>{{ $book->title }}</h2>
            <p>{{ $book->description }}</p>
            <p>Penulis: {{ $book->author->name ?? '-' }}</p>
            <p>Genre: {{ $book->genre->name ?? '-' }}</p>
            <p>Harga: Rp{{ number_format($book->price, 0, ',', '.') }}</p>
            <p>Stok: {{ $book->stock }}</p>
        </article>
        <hr>
    @empty
        <p>Belum ada data buku.</p>
    @endforelse
</body>
</html>