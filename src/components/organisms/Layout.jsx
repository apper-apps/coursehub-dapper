import React from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import Footer from "@/components/organisms/Footer"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}