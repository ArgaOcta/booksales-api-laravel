import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Genres from "./pages/Genres";
import Authors from "./pages/Authors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-3xl font-bold text-red-600">
        403 - Akses Ditolak
      </h1>
      <p className="text-slate-600 mt-2">
        Kamu tidak memiliki hak akses ke halaman ini.
      </p>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat aplikasi...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={user ? (user.role === "admin" ? "/admin/genres" : "/home") : "/login"}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={user ? <Navigate to={user.role === "admin" ? "/admin/genres" : "/home"} replace /> : <Login />}
      />

      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="genres" element={<Genres />} />
          <Route path="authors" element={<Authors />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}