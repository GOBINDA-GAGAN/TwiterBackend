import React, { createContext, useContext, useEffect, useState } from "react";
import { loginService, signupService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Restore user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginService({ email, password });

      console.log("Login successful:", data);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Save it

      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      return {
        success: false,
        message:
          err.response?.data?.message || "Login failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const signup = async (email, password, username) => {
    try {
      const data = await signupService({ email, password, username });
      console.log(data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, loading, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
