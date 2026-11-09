import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      alert("Logout gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-700">
            Book<span className="text-slate-800">Sales</span>
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Selamat Datang, {user?.name}!
          </h2>

          <p className="text-slate-500 mt-3">
            Selamat datang di halaman utama Booksales.
            Kamu berhasil login sebagai pengguna.
          </p>

          <div className="mt-8 bg-indigo-50 rounded-xl p-5">
            <h3 className="font-semibold text-indigo-900">
              Informasi Akun
            </h3>

            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p>Nama: {user?.name}</p>
              <p>Username: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>Role: {user?.role}</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}