import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login, loading } = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const result = await login(email, password);
    if (result.success) {
      navigate("/"); // or homepage
    } else {
      setError(result.message);
    }
  };

  const handleGoogleLogin = () => {
    // Add Google login logic
    console.log("Google login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-6 max-w-sm mx-auto w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          <p className="text-sm text-center text-gray-500 mb-2">
            Log in to enjoy your feed and interact with others.
          </p>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              placeholder="Enter your email or username"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
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
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
              {error && (
                <p className="text-red-600 font-normal text-xs mt-1">{error}</p>
              )}
            </div>
          </div>

          <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer mt-2">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-2 rounded-full cursor-pointer"
          >
            Login
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="h-[1px] bg-gray-300 w-1/4" />
            <span className="text-gray-400 text-sm">or</span>
            <span className="h-[1px] bg-gray-300 w-1/4" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-2 border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
