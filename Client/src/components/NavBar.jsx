import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import AddPostModal from "./AddPostModal";
import SideBar from "./SideBar"; // 👈 Import your full sidebar

const NavBar = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClickAddPost = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  return (
    <div className="relative w-full">
      {/* Top Nav */}
      <div className="flex flex-wrap justify-between items-center gap-4 px-4 py-3 sm:px-6">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1">
          <button
            className="text-2xl sm:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <RxHamburgerMenu />
          </button>
          <div className="flex items-center w-[500px] bg-white px-2 rounded-4xl gap-2 border border-gray-300">
            <CiSearch size={22} className="text-black" />
            <input
              type="text"
              placeholder="Search..."
              className="py-2 w-full outline-none text-sm "
            />
          </div>
        </div>

        {/* Right: Icons and Add Post */}
        <div className="flex gap-4 items-center w-full sm:w-auto justify-end">
          <Link to="/notification">
            <IoIosNotificationsOutline size={24} className="text-gray-700" />
          </Link>
          <Link to="/message">
            <TiMessages size={24} className="text-gray-700" />
          </Link>

          <button
            onClick={handleClickAddPost}
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 flex items-center gap-2 text-sm sm:text-base font-medium px-4 py-2 rounded-full text-white"
          >
            <FiPlus size={20} />
            <span className="hidden sm:inline">Add Post</span>
          </button>
        </div>
      </div>

      {/* Sidebar Slide-in */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-[60%] sm:w-[250px] transform transition-transform duration-300 z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      

        {/* 🧠 Use your actual SideBar component */}
        <div className="h-full relative overflow-hidden">
          <button
            className="text-gray-500 text-4xl p-2 bg-red-100  rounded-2xl absolute right-3 top-4"
            onClick={() => setShowSidebar(false)}
          >
            &times;
          </button>
          <SideBar />
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Post Modal */}
      {showForm && <AddPostModal onClose={handleClose} />}
    </div>
  );
};

export default NavBar;
