import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Genres from "./pages/Genres";
import Authors from "./pages/Authors";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/genres" replace />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="genres" element={<Genres />} />
          <Route path="authors" element={<Authors />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/genres" replace />} />
      </Routes>
    </BrowserRouter>
  );
}