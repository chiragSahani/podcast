import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const SideBarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarLayout;
