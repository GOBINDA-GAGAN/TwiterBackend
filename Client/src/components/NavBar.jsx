import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between px-6 py-5">
      <div className=" rounded-4xl flex items-center w-[350px] bg-[#FFFFFF] px-2 gap-2">
        <CiSearch size={25} className="text-black" />
        <input
          type="text"
          placeholder="search..."
          className="py-2 w-full outline-none"
        />
      </div>
      <div className=" flex gap-2 space-x-4 items-center">
          <Link to="/notification">
          <IoIosNotificationsOutline size={25} />
        </Link>
        <Link to="/message">
          <TiMessages size={25} />
        </Link>
      
        <button
        onClick={navigator("/add-post")}
        className="cursor-pointer bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 flex items-center gap-2 text-base font-medium px-4 py-2 rounded-full w-full text-white">
          <FiPlus size={25} />
          Add Post
        </button>
      </div>
    </div>
  );
};

export default NavBar;
