// src/components/SidebarLinks.jsx
import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

import {
  FiCompass,
  FiVideo,
  FiSettings,
} from "react-icons/fi";

const links = [
  { name: "Feed", path: "/", icon: <IoHomeSharp /> },
  { name: "Reels", path: "/reels", icon: <FiVideo /> },
  { name: "Explore", path: "/explore", icon: <FiCompass /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

const SidebarLinks = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-1 mt-3">
      {links.map(({ name, path, icon }) => (
        <Link
          key={name}
          to={path}
          className={`flex items-center gap-2 text-base font-medium px-2 py-3 rounded-md transition 
            ${
              location.pathname === path
                ? "bg-gray-200 text-black"
                : "text-gray-700 hover:bg-gray-100 hover:text-black"
            }`}
        >
          <span className="text-xl">{icon}</span>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default SidebarLinks;
