import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/NavBar/Logo.png";
import SettingsIcon from "../../assets/NavBar/SettingsIcon.png";
import NotificationIcon from "../../assets/NavBar/NotificationIcon.png";

const NavBar = () => {
  return (
    // navbar section
    <div className=" w-full bg-white min-h-8 flex justify-between">
      {/* Logo Section */}
      <NavLink to="/">
        <img className="w-32 m-5 " src={Logo} alt="Logo" />
      </NavLink>

      {/* Icon section */}
      <div className=" flex justify-center items-center ">
        <NavLink to="/view/settings">
          <img
            className="w-7 h-7 m-3 cursor-pointer hover:scale-110 duration-300 "
            src={SettingsIcon}
            alt="Settings"
            title="Settings"
          />
        </NavLink>
        <NavLink to="/Notifications">
          <img
            className="w-7 h-7 mr-6 ml-2 cursor-pointer hover:scale-110 duration-300"
            src={NotificationIcon}
            alt="Notifications"
            title="Notifications"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
