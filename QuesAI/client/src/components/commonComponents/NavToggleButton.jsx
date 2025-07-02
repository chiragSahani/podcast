import React from 'react'

const NavToggleButton = ({ toggleSidebar , isOpen }) => {
  return (
    <button
    onClick={toggleSidebar}
    className="relative w-12 h-12 bg-primary text-white rounded-full focus:outline-none overflow-hidden transition-all duration-300 ease-in-out"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`w-6 h-6 flex flex-col justify-between transform transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <span
          className={`block w-full h-0.5 bg-white rounded transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-white rounded transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-white rounded transform transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </div>
    </div>
  </button>
  )
}

export default NavToggleButton