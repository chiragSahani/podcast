import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Logo from "../../assets/NavBar/Logo.png";
import SettingsIcon from '../../assets/Sidebar/SettingsIcon.png'
import NavToggleButton from "./NavToggleButton";

const SideBar = () => {
  const location = useLocation();
  const activePath = location.pathname;
  const { projectId , fileId } = useParams();
  const [isOpen, setIsOpen] = useState(false); //for mobile responsive navbar


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed top-3 right-5 md:hidden z-50">
        <NavToggleButton toggleSidebar={toggleSidebar} isOpen={isOpen} />
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 w-8/12 min-h-screen bg-bg_sidebar font-roboto transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:hidden`}
      >
        <div className="p-5 flex flex-col justify-between h-full">
          {/* Top Section */}
          <div>
            <NavLink to="/">
              <img src={Logo} alt="Logo" title="home" className="w-40" />
            </NavLink>

            <p className="font-roboto text-sm mt-5">Podcast Upload Flow</p>

            {/* NavLinks */}
            <div className="w-full flex-col items-center my-3">
              {/* Upload Project Link */}
              <div className="w-full rounded-3xl mb-2">
                <NavLink 
                  to={`/project/upload/${projectId}`}
                  className={({ isActive }) => 
                    `block rounded-3xl ${isActive ? "bg-primary" : "hover:bg-gray-400"}`
                  }
                >
                  <div className="flex gap-3 items-center h-10">
                    <span className="bg-violet-950 text-white rounded-full px-2 ml-3">1</span>
                    <p className={`text-sm font-roboto ${activePath === `/project/upload/${projectId}` ? 'text-white' : ''}`}>Upload Project</p>
                  </div>
                </NavLink>
              </div>

              {/* Widget Config Link */}
              <div className="w-full rounded-3xl mb-2">
                <NavLink 
                  to={`/project/widget/config/${projectId}`}
                  className={({ isActive }) => 
                    `block rounded-3xl ${isActive ? "bg-primary" : "hover:bg-gray-400"}`
                  }
                >
                  <div className="flex gap-3 items-center h-10">
                    <span className="bg-violet-950 text-white rounded-full px-2 ml-3">2</span>
                    <p className={`text-sm font-roboto ${activePath === `/project/widget/config/${projectId}` ? 'text-white' : ''}`}>Widget Configurations</p>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Bottom Section - Settings Link */}
          <div className="w-full">
            <NavLink 
              to="/settings"
              className={({ isActive }) => 
                `block rounded-3xl ${isActive ? "bg-primary" : "hover:bg-gray-400"}`
              }
            >
              <div className="flex gap-3 items-center h-10">
                <span className="bg-violet-950 text-white rounded-full px-2 ml-3">S</span>
                <p className={`text-sm font-roboto ${activePath === "/settings" ? 'text-white' : ''}`}>Settings</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex w-3/12 min-h-screen bg-bg_sidebar font-roboto flex-col justify-between">
        {/* Top Section */}
        <div>
          <NavLink to="/">
            <img src={Logo} alt="Logo" title="home" className="w-40 p-5" />
          </NavLink>

          <p className="font-roboto text-sm pl-5">Podcast Upload Flow</p>

          {/* NavLinks */}
          <div className="w-full flex-col items-center my-3 pl-3">
            {/* Upload Project Link */}
            <div className={`w-11/12 rounded-3xl mb-2 ${activePath === `/project/${projectId}/file/edit/${fileId}` ? 'bg-primary text-white' : ' ' }`}>
              <NavLink 
                to={`/project/upload/${projectId}`}
                className={({ isActive }) => 
                  `block rounded-3xl ${isActive ? "bg-primary" : "hover:bg-gray-300"}`
                }
              >
                <div className="flex gap-3 items-center h-10">
                  <span className={`${activePath === `/project/upload/${projectId}` ? 'bg-violet-900' : 'bg-gray-400' } text-white rounded-full px-2 ml-3`}>1</span>
                  <p className={`text-sm font-roboto ${activePath === `/project/upload/${projectId}` ? 'text-white' : ''}`}>Upload Project</p>
                </div>
              </NavLink>
            </div>

            {/* Widget Config Link */}
            <div className="w-11/12 rounded-3xl mb-2">
              <NavLink 
                to={`/project/widget/config/${projectId}`}
                className={({ isActive }) => 
                  `block rounded-3xl ${isActive ? "bg-primary" : "hover:bg-gray-300"}`
                }
              >
                <div className="flex gap-3 items-center h-10">
                  <span className={`${activePath === `/project/widget/config/${projectId}` ? 'bg-violet-900' : 'bg-gray-400' }  text-white rounded-full px-2 ml-3`}>2</span>
                  <p className={`text-sm font-roboto ${activePath === `/project/widget/config/${projectId}` ? 'text-white' : ''}`}>Widget Configurations</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Bottom Section - Settings Link */}
        <div className="w-full pl-3 pb-5 ">
          <NavLink 
            to="/view/settings"
            className={({ isActive }) => 
              `block w-11/12 rounded-md ${
                isActive 
                  ? "bg-primary text-white" 
                  : "border-t-2 border-gray-400 hover:bg-gray-300"
              } duration-300`
            }
          >
            <div className="flex gap-3 items-center h-10">
              <span className="rounded-full pl-2 ml-3">
                <img className="w-8 " src={SettingsIcon} alt="settings" title="settings" />
              </span>
              <p className="text-sm font-roboto">Settings</p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideBar;