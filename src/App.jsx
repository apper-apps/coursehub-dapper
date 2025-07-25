import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Home from "@/components/pages/Home"
import ArticleDetail from "@/components/pages/ArticleDetail"
import AboutUs from "@/components/pages/AboutUs"
import Contact from "@/components/pages/Contact"
import PrivacyPolicy from "@/components/pages/PrivacyPolicy"
import AdminLogin from "@/components/pages/AdminLogin"
import AdminDashboard from "@/components/pages/AdminDashboard"
import AdminArticles from "@/components/pages/AdminArticles"
import AdminPages from "@/components/pages/AdminPages"
import AdminSettings from "@/components/pages/AdminSettings"
import { AuthProvider } from "@/hooks/useAuth"

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/pages" element={<AdminPages />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </>
  )
}