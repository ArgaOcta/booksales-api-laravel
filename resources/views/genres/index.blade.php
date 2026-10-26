
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Genre</title>
</head>
<body>
    <h1>Daftar Genre</h1>

    <nav>
        <a href="{{ route('books.index') }}">Buku</a> |
        <a href="{{ route('authors.index') }}">Penulis</a> |
        <a href="{{ route('genres.index') }}">Genre</a>
    </nav>

    <hr>

    @forelse ($genres as $genre)
        <article>
            <h2>{{ $genre->name }}</h2>

            <h3>Buku dalam genre ini:</h3>
            @forelse ($genre->books as $book)
                <p>{{ $book->title }}</p>
            @empty
                <p>Belum ada buku dalam genre ini.</p>
            @endforelse
        </article>
        <hr>
    @empty
        <p>Belum ada data genre.</p>
    @endforelse
</body>
</html>
