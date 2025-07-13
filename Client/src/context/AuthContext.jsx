import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfileService } from "../services/profileService"; // or userService
import { loginService, logoutService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load profile on mount (if cookie is valid)
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await getProfileService();
      setUser(data.user);
    } catch (err) {
      console.error("Not logged in or session expired:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []); // ✅ fetch profile on app load (once)


  // ✅ Login function
  const login = async (formData) => {
    const res = await loginService(formData); // this will set the cookie
    if (res.success) {
      setUser(res.user); // or re-fetch profile if needed
    }
    return res;
  };

  // ✅ Logout
  const logout = async () => {
    await logoutService(); // clears cookie on backend
    setUser(null);         // clear frontend state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
