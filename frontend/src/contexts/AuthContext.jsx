import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/me");
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("admin_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    localStorage.setItem("admin_token", response.data.token);
    setUser(response.data.user);

    return response.data.user;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } finally {
      localStorage.removeItem("admin_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}