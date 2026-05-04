import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl font-bold mb-4" style={{ color: '#1B4F8A' }}>404</p>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-6">The page you are looking for doesn't exist.</p>
        <Link to="/dashboard" style={{ color: '#1B4F8A' }} className="hover:underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}