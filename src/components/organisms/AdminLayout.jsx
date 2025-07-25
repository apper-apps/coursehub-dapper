import React, { useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

export default function AdminLayout({ children }) {
  const { isAuthenticated, logout, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login")
    }
  }, [isAuthenticated, loading, navigate])

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
    { name: "Articles", href: "/admin/articles", icon: "FileText" },
    { name: "Pages", href: "/admin/pages", icon: "File" },
    { name: "Settings", href: "/admin/settings", icon: "Settings" },
  ]

  const isActive = (href) => location.pathname === href

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-200 border-t-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-lg">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold gradient-text">CourseHub Pro</span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                      : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
                  )}
                >
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive(item.href) ? "text-primary-500" : "text-secondary-400"
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-secondary-200 p-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="w-4 h-4 text-secondary-600" />
                </div>
                <span className="ml-2 text-sm font-medium text-secondary-700">Admin</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="p-2"
              >
                <ApperIcon name="LogOut" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <div className="bg-white shadow-sm border-b border-secondary-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold gradient-text">CourseHub Pro</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="p-2"
            >
              <ApperIcon name="LogOut" className="w-4 h-4" />
            </Button>
          </div>
          <nav className="px-4 pb-3">
            <div className="flex space-x-1 overflow-x-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700"
                      : "text-secondary-600 hover:bg-secondary-50"
                  )}
                >
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-2 h-4 w-4",
                      isActive(item.href) ? "text-primary-500" : "text-secondary-400"
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}