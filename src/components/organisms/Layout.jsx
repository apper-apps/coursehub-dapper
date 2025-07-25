import React from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import Footer from "@/components/organisms/Footer"

export default function Layout() {
  return (
<div className="min-h-screen bg-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}