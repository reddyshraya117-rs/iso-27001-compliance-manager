import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DetailPage from "./pages/DetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function Layout({ children }) {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideNav && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute><ErrorBoundary><DashboardPage /></ErrorBoundary></ProtectedRoute>} />
              <Route path="/records" element={<ProtectedRoute><ErrorBoundary><ListPage /></ErrorBoundary></ProtectedRoute>} />
              <Route path="/records/:id" element={<ProtectedRoute><ErrorBoundary><DetailPage /></ErrorBoundary></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><ErrorBoundary><FormPage /></ErrorBoundary></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><ErrorBoundary><FormPage /></ErrorBoundary></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><ErrorBoundary><AnalyticsPage /></ErrorBoundary></ProtectedRoute>} />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}