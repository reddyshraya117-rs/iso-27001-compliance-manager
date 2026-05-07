import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/records", label: "Records" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <nav className="bg-[#1B4F8A] text-white px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">ISO 27001</span>
          {/* Desktop links */}
          <div className="hidden md:flex gap-4">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm hover:text-blue-200 ${
                  location.pathname === link.path
                    ? "text-white font-semibold border-b-2 border-white pb-0.5"
                    : "text-blue-200"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop logout */}
        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="hidden md:block text-sm text-blue-200 hover:text-white"
        >
          Logout
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 pb-2">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
              className={`text-sm text-left py-2 border-b border-blue-700 ${
                location.pathname === link.path
                  ? "text-white font-semibold"
                  : "text-blue-200"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="text-sm text-left text-blue-200 hover:text-white py-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}