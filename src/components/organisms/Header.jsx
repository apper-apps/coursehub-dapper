import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Blog", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ]

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true
    if (href !== "/" && location.pathname.startsWith(href)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CourseHub Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  isActive(item.href)
                    ? "text-primary-600"
                    : "text-secondary-600"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <Link to="/admin/login">
              <Button variant="ghost" size="sm" className="p-2">
                <ApperIcon name="Settings" className="w-4 h-4" />
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              <ApperIcon 
                name={mobileMenuOpen ? "X" : "Menu"} 
                className="w-5 h-5" 
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200 bg-white">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-primary-600 bg-primary-50"
                      : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 rounded-md transition-colors"
              >
                <ApperIcon name="Settings" className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}