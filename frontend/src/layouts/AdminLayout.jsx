import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLayout() {
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

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  return (
    <div className="min-h-screen bg-slate-100">
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

      <main className="md:ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-800">
              BookSales Admin
            </h2>
            <p className="text-xs text-slate-400">
              Login sebagai {user?.name} ({user?.role})
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}