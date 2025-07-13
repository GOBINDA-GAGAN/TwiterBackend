import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import SidebarLinks from "./SidebarLinks";
import { FiLogOut } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../services/authService";

const SideBar = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const [error, setError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit login/signup form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService(formData);

      console.log(response);

      // ✅ If backend returns success: false (e.g., user not found)
      if (!response.success) {
        console.error("Backend says:", response.message); // Print backend message
        setError(response.message); // Show error in UI
        return;
      }

      // 🔐 Successful login — save user and token
      login(response);
      console.log("Login successful:", response.user || response); // optional success log

      // 🚀 Redirect to home
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      // ✅ Handle backend errors (e.g., 400, 401, etc.)
      if (err.response?.data?.message) {
        console.error("Backend says:", err.response.data.message);
        setError(err.response.data.message);
      } else {
        // 🚨 Unknown error fallback
        console.log("Unexpected error:", err);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    // const response = logoutService();
    // console.log(response);

    setIsLoggedIn(false);
    navigate("/signup");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="w-[350px] p-4 overflow-y-auto h-screen  thin-scrollbar scroll-smooth z-20">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Link to="/">
          <img
            src="/insta logo.png"
            alt="Logo"
            className=" h-14 md:h-20 object-contain"
          />
        </Link>
      </div>

      {/* If Logged In */}
      {isLoggedIn ? (
        <div className="h-[90vh]">
          <Profile />
          <SidebarLinks />
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:bg-red-100 w-full px-3 py-2 rounded-md"
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      ) : isLoginPage || isSignupPage ? (
        // Login or Signup View
        <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {isSignupPage ? "Sign Up" : "Login"}
            </h2>
            <p className="text-sm text-center text-gray-500 mb-2">
              {isSignupPage
                ? "Sign up to connect with your friends and share memories."
                : "Log in to enjoy your feed and interact with others."}
            </p>

            {isSignupPage && (
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Username"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            )}

            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder={
                isSignupPage ? "Email" : "Enter your email or username"
              }
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {error && (
                <p className=" text-red-600 font-normal text-xs">{error}</p>
              )}
            </div>

            {isSignupPage && (
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            )}

            {!isSignupPage && (
              <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-2 rounded-full cursor-pointer"
            >
              {isSignupPage ? "Create Account" : "Login"}
            </button>

            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-[1px] bg-gray-300 w-1/4" />
              <span className="text-gray-400 text-sm">or</span>
              <span className="h-[1px] bg-gray-300 w-1/4" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            <p className="text-center text-sm text-gray-600">
              {isSignupPage
                ? "Already have an account?"
                : "Don’t have an account?"}{" "}
              <Link
                to={isSignupPage ? "/login" : "/signup"}
                className="text-blue-600 font-medium hover:underline"
              >
                {isSignupPage ? "Login" : "Sign Up"}
              </Link>
            </p>
          </form>
        </div>
      ) : (
        // Default Fallback (not logged in but not on login/signup)
        <>
          <Profile />
          <SidebarLinks />
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-100 text-gray-900 hover:bg-red-200 w-full px-3 py-2 rounded-md"
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
