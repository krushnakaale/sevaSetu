import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const resources = [
    { name: "Documentation", path: "/docs" },
    { name: "Help Center", path: "/help" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const company = [
    { name: "Our Team", path: "/team" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Partners", path: "/partners" },
  ];

  const socialLinks = [
    // { name: "Twitter", href: "#", icon: <FaTwitter /> },
    // { name: "Facebook", href: "#", icon: <FaFacebookF /> },
    {
      name: "Instagram",
      href: "https://www.instagram.com/krushna_kaale/",
      icon: <FaInstagram />,
    },

    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/krushnakaale",
      icon: <FaLinkedinIn />,
    },
    {
      name: "GitHub",
      href: "https://github.com/krushnakaale",
      icon: <FaGithub />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="inline-block mb-4">
              <h2 className="text-3xl font-bold text-white tracking-wide">
                AIPP
              </h2>
            </NavLink>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Empowering your future with cutting-edge AI interview solutions.
              Practice, prepare, and succeed with confidence.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="hover:text-yellow-400 transition"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="hover:text-yellow-400 transition"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {company.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="hover:text-yellow-400 transition"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">AIPP</span>. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <NavLink to="/privacy" className="hover:text-yellow-400 transition">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="hover:text-yellow-400 transition">
              Terms
            </NavLink>
            <NavLink to="/cookies" className="hover:text-yellow-400 transition">
              Cookies
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
