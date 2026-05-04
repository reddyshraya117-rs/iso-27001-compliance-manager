import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/compliance', label: 'Controls' },
  { to: '/analytics', label: 'Analytics' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{ backgroundColor: '#1B4F8A' }} className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/dashboard" className="text-lg font-semibold tracking-wide text-white">
            ISO 27001 Compliance
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  location.pathname.startsWith(to)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-white/70 hidden sm:block">
                {user.email} · <span className="font-medium">{user.role}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1.5 rounded border border-white/30 hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}