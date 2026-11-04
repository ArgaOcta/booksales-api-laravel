import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [token, setToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");

    if (savedToken) {
      setToken(savedToken);
      setTokenSaved(true);
    }
  }, []);

  const handleSaveToken = (e) => {
    e.preventDefault();

    if (!token.trim()) return;

    localStorage.setItem("admin_token", token.trim());
    setTokenSaved(true);

    alert("Token Admin berhasil disimpan!");
  };

  const handleRemoveToken = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setTokenSaved(false);
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-full md:fixed md:inset-y-0 md:left-0 md:w-64 bg-white border-r border-slate-200 z-20">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-extrabold text-indigo-700">
            Book<span className="text-slate-800">Sales</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administration Dashboard
          </p>
        </div>

        <div className="p-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-3">
            Main Menu
          </p>

          <nav className="space-y-2">
            <NavLink to="/admin/genres" className={menuClass}>
              <span>📚</span>
              <span className="font-medium">Genres</span>
            </NavLink>

            <NavLink to="/admin/authors" className={menuClass}>
              <span>✍️</span>
              <span className="font-medium">Authors</span>
            </NavLink>
          </nav>
        </div>

        <div className="p-4 mt-2">
          <div className="rounded-xl bg-indigo-50 p-4">
            <p className="font-semibold text-sm text-indigo-900">
              Admin Panel
            </p>
            <p className="text-xs text-indigo-600 mt-1">
              Manage your bookstore data.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-800">
              BookSales Admin
            </h2>
            <p className="text-xs text-slate-400">
              Manage genres and authors
            </p>
          </div>

          {/* Admin Token */}
          <form onSubmit={handleSaveToken} className="flex flex-wrap gap-2">
            <input
              type="password"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setTokenSaved(false);
              }}
              placeholder="Masukkan token Admin"
              className="w-52 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Simpan
            </button>

            {tokenSaved && (
              <button
                type="button"
                onClick={handleRemoveToken}
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Hapus Token
              </button>
            )}
          </form>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
