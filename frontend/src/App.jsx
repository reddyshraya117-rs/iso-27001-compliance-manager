import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import LoginPage      from './pages/LoginPage'
import DashboardPage  from './pages/DashboardPage'
import ListPage       from './pages/ListPage'
import DetailPage     from './pages/DetailPage'
import CreatePage     from './pages/CreatePage'
import EditPage       from './pages/EditPage'
import AnalyticsPage  from './pages/AnalyticsPage'
import NotFoundPage   from './pages/NotFoundPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/compliance" element={<ProtectedRoute><ListPage /></ProtectedRoute>} />
          <Route path="/compliance/new" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
          <Route path="/compliance/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
          <Route path="/compliance/:id/edit" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}