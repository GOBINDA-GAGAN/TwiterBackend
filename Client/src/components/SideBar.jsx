import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import SidebarLinks from "./SidebarLinks";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {

    const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>No user found. Please log in.</p>;
  const handleLogout = () => {
    logout();               // clear user + localStorage
    navigate("/login");     // redirect to login page
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

      <div className="h-[90vh]">
        <Profile />
        <SidebarLinks />

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 bg-red-100 text-gray-900 hover:bg-red-200 w-full px-3 py-2 rounded-md"
          >
            <FiLogOut className="text-xl" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
