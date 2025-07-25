import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(credentials.username, credentials.password)
    
    if (success) {
      toast.success("Login successful!")
      navigate("/admin/dashboard")
    } else {
      toast.error("Invalid credentials. Please try again.")
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 to-secondary-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">CourseHub Pro</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-secondary-300">Sign in to manage your content</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              placeholder="Enter your username"
            />
            
            <FormField
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <ApperIcon name="LogIn" className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
            <p className="text-sm text-secondary-600 mb-2">Demo Credentials:</p>
            <div className="text-sm font-mono">
              <p>Username: <span className="font-semibold">admin</span></p>
              <p>Password: <span className="font-semibold">password123</span></p>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-secondary-300 hover:text-white transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  )
}