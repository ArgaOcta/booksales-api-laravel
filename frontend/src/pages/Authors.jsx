import { useEffect, useState } from "react";
import api from "../services/api";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    photo: "",
    bio: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    photo: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Read Author menggunakan Axios GET
  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/authors");
      const result = response.data?.data;

      setAuthors(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal mengambil data author."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Menangani perubahan input form tambah
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create Author menggunakan Axios POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Nama author wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.post("/authors", {
        name: form.name.trim(),
        photo: form.photo.trim() || null,
        bio: form.bio.trim() || null,
      });

      setSuccess(
        response.data?.message || "Author berhasil ditambahkan."
      );

      setForm({
        name: "",
        photo: "",
        bio: "",
      });

      await fetchAuthors();
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal menambahkan author."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Memulai proses edit author
  const handleEdit = (author) => {
    setEditingId(author.id);

    setEditForm({
      name: author.name || "",
      photo: author.photo || "",
      bio: author.bio || "",
    });

    setError("");
    setSuccess("");
  };

  // Menangani perubahan input edit
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // Update Author menggunakan Axios PUT
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editForm.name.trim()) {
      setError("Nama author wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.put(`/authors/${editingId}`, {
        name: editForm.name.trim(),
        photo: editForm.photo.trim() || null,
        bio: editForm.bio.trim() || null,
      });

      setSuccess(
        response.data?.message || "Author berhasil diperbarui."
      );

      setEditingId(null);

      setEditForm({
        name: "",
        photo: "",
        bio: "",
      });

      await fetchAuthors();
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal memperbarui author."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Author menggunakan Axios DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus author ini?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await api.delete(`/authors/${id}`);

      setSuccess(
        response.data?.message || "Author berhasil dihapus."
      );

      if (editingId === id) {
        setEditingId(null);

        setEditForm({
          name: "",
          photo: "",
          bio: "",
        });
      }

      await fetchAuthors();
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal menghapus author."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Master Data / Author
        </p>

        <h1 className="text-2xl font-bold text-slate-800 mt-1">
          Author Management
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Kelola informasi penulis buku pada Booksales.
        </p>
      </div>

      {/* Notifikasi */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Form Create */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Tambah Author Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nama Author
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama author..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Foto Author (URL)
            </label>

            <input
              type="url"
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Biografi
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="3"
              placeholder="Masukkan biografi author..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl px-6 py-3 text-sm transition"
          >
            {submitting ? "Menyimpan..." : "+ Tambah Author"}
          </button>
        </form>
      </div>

      {/* Form Edit */}
      {editingId !== null && (
        <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-5">
            Edit Author #{editingId}
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Author
              </label>

              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="Masukkan nama author..."
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Foto Author (URL)
              </label>

              <input
                type="url"
                name="photo"
                value={editForm.photo}
                onChange={handleEditChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Biografi
              </label>

              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleEditChange}
                rows="3"
                placeholder="Masukkan biografi author..."
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl px-6 py-3 text-sm"
              >
                {submitting ? "Menyimpan..." : "Simpan Perubahan"}
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setEditingId(null);
                  setEditForm({
                    name: "",
                    photo: "",
                    bio: "",
                  });
                }}
                className="bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 font-semibold rounded-xl px-6 py-3 text-sm"
              >
                Batal
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Tabel Author */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-slate-800">
              Daftar Author
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Data author dari Laravel API.
            </p>
          </div>

          <button
            onClick={fetchAuthors}
            disabled={loading}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold disabled:opacity-50"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Biografi</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-400">
                    Memuat data author...
                  </td>
                </tr>
              ) : authors.length > 0 ? (
                authors.map((author, index) => (
                  <tr key={author.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {author.photo ? (
                          <img
                            src={author.photo}
                            alt={author.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {author.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                        )}

                        <span className="font-semibold text-slate-800">
                          {author.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600 max-w-sm">
                      {author.bio || "-"}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      #{author.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(author)}
                          disabled={deletingId !== null}
                          className="bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 px-3 py-2 rounded-lg font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(author.id)}
                          disabled={deletingId !== null}
                          className="bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 px-3 py-2 rounded-lg font-semibold"
                        >
                          {deletingId === author.id ? "Menghapus..." : "Hapus"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-400">
                    Belum ada data author.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-slate-50 text-xs text-slate-500">
          Total Author: {authors.length}
        </div>
      </div>

    </div>
  );
}