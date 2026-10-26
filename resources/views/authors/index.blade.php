<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Penulis</title>
</head>
<body>
    <h1>Daftar Penulis</h1>

    <nav>
        <a href="{{ route('books.index') }}">Buku</a> |
        <a href="{{ route('authors.index') }}">Penulis</a> |
        <a href="{{ route('genres.index') }}">Genre</a>
    </nav>

    <hr>

    @forelse ($authors as $author)
        <article>
            <h2>{{ $author->name }}</h2>
            <p>{{ $author->bio ?? 'Belum ada biografi.' }}</p>

            <h3>Buku:</h3>
            @forelse ($author->books as $book)
                <p>{{ $book->title }}</p>
            @empty
                <p>Belum ada buku.</p>
            @endforelse
        </article>
        <hr>
    @empty
        <p>Belum ada data penulis.</p>
    @endforelse
</body>
</html>
