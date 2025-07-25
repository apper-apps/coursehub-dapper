import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authStatus = localStorage.getItem("coursehub_auth")
    setIsAuthenticated(authStatus === "true")
    setLoading(false)
  }, [])

  const login = (username, password) => {
    // Hardcoded credentials
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true)
      localStorage.setItem("coursehub_auth", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("coursehub_auth")
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}