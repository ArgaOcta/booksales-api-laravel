import { useEffect, useState } from "react";
import api from "../services/api";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Read Genre menggunakan Axios GET
  const fetchGenres = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/genres");
      const result = response.data?.data;

      setGenres(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal mengambil data genre."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Create Genre menggunakan Axios POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Nama genre wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.post("/genres", {
        name: name.trim(),
      });

      setSuccess(
        response.data?.message || "Genre berhasil ditambahkan."
      );

      setName("");
      await fetchGenres();
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal menambahkan genre."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Master Data / Genre
        </p>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">
          Genre Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola daftar kategori buku pada Booksales.
        </p>
      </div>

      {/* Form Create */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Tambah Genre Baru
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama genre..."
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl px-6 py-3 text-sm transition"
          >
            {submitting ? "Menyimpan..." : "+ Tambah Genre"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
            {success}
          </p>
        )}
      </div>

      {/* Tabel Genre */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-slate-800">
              Daftar Genre
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Data genre dari Laravel API.
            </p>
          </div>

          <button
            onClick={fetchGenres}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Nama Genre</th>
                <th className="px-6 py-4">ID</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-400">
                    Memuat data genre...
                  </td>
                </tr>
              ) : genres.length > 0 ? (
                genres.map((genre, index) => (
                  <tr key={genre.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {genre.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      #{genre.id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-400">
                    Belum ada data genre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-slate-50 text-xs text-slate-500">
          Total Genre: {genres.length}
        </div>
      </div>

    </div>
  );
}
