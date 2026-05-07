import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/records", label: "Records" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <nav className="bg-[#1B4F8A] text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">ISO 27001</span>
        <div className="flex gap-4">
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
      <button
        onClick={() => { logout(); navigate("/login"); }}
        className="text-sm text-blue-200 hover:text-white"
      >
        Logout
      </button>
    </nav>
  );
}