import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Email/username dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const user = await login(
        form.email.trim(),
        form.password
      );

      if (user.role === "admin") {
        navigate("/admin/genres", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login gagal. Periksa koneksi server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl text-white font-bold">B</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Selamat Datang
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Login untuk melanjutkan ke Booksales
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Login Pengguna
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Masukkan email atau username dan password.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email / Username
              </label>

              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email atau username"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl py-3 mt-2 transition shadow-md shadow-indigo-100"
            >
              {loading ? "Memproses..." : "Login"}
            </button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Daftar sekarang
              </Link>
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