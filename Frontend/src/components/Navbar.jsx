import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Progress", path: "/progress" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl md:text-3xl font-bold tracking-wide text-white"
            >
              AIPP
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-700 text-yellow-400"
                      : "text-gray-200 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-md font-semibold hover:bg-yellow-500 hover:shadow-md transition duration-200">
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-200 hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${
            isOpen ? "max-h-96 mt-2" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 pb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-700 text-yellow-400"
                      : "text-gray-200 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button className="mt-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 hover:shadow-md transition duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
