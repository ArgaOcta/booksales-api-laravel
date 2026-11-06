import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess("");

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username wajib diisi.";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
      });

      setSuccess(
        response.data?.message || "Registrasi berhasil!"
      );

      setForm({
        name: "",
        email: "",
        username: "",
        password: "",
      });
    } catch (err) {
      const serverErrors = err.response?.data?.errors;

      if (serverErrors) {
        const formattedErrors = {};

        Object.keys(serverErrors).forEach((key) => {
          formattedErrors[key] = serverErrors[key][0];
        });

        setErrors(formattedErrors);
      } else {
        setErrors({
          general:
            err.response?.data?.message ||
            "Registrasi gagal. Periksa koneksi server.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl text-white font-bold">B</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Buat Akun Baru
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Daftar untuk mulai menggunakan Booksales
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Registrasi Pengguna
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Lengkapi informasi akun kamu.
            </p>
          </div>

          {success && (
            <div className="mb-5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              {success}
            </div>
          )}

          {errors.general && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nama Lengkap
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              {errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Buat username"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              {errors.username && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              {errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl py-3 mt-2 transition shadow-md shadow-indigo-100"
            >
              {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Booksales User Registration
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Booksales. All rights reserved.
        </p>

      </div>
    </div>
  );
}