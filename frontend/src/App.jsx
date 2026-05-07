import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
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
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><ListPage /></ProtectedRoute>} />
            <Route path="/records/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}