import React from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">
      {/* Sidebar - scroll only on Y axis */}
      <aside className="  w-[350px] max-h-screen   bg-white pr-4 h-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <SideBar />
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col bg-[#F6F6F6] m-4 rounded-3xl ">
        <NavBar />
        <div className="flex-1 overflow-y-auto thin-scrollbar">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
