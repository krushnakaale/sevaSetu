import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [menuOpen, setMenuOpen] = useState(false); // avatar dropdown
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Progress", path: "/progress" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setMenuOpen(false);
    navigate("/login");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-bold text-white">
          AIPP
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-gray-700 text-yellow-400"
                    : "text-gray-200 hover:bg-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {!user ? (
            <NavLink to="/login">
              <button className="bg-yellow-400 px-5 py-2 rounded font-semibold">
                Get Started
              </button>
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-lg text-yellow-600"
              >
                <Avatar user={user} size={40} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow text-gray-900">
                  <p className="px-4 py-2 border-b font-semibold">
                    {user.name}
                  </p>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/student"}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Right-side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-gray-900 z-50 shadow-2xl p-6 flex flex-col text-white
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="self-end mb-6 text-4xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        {/* Nav Links */}
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 my-2 rounded-lg text-lg font-medium transition-all duration-200
         ${
           isActive
             ? "bg-yellow-100 text-gray-900 shadow-inner"
             : "text-white hover:bg-yellow-100 hover:text-gray-900"
         }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {!user ? (
          <NavLink to="/login" className="mt-6">
            <button className="w-full bg-yellow-400 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition">
              Get Started
            </button>
          </NavLink>
        ) : (
          <div className="mt-6 bg-gray-800 rounded-lg shadow-inner">
            <p className="px-4 py-3 border-b border-gray-700 font-semibold">
              {user.name}
            </p>
            <Link
              to={user.role === "admin" ? "/admin" : "/student"}
              className="block px-4 py-3 hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link to="/settings" className="block px-4 py-3 hover:bg-gray-700">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Overlay for click outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
