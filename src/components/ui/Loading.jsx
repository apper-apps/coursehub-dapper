import React from "react"

export default function Loading({ type = "page" }) {
  if (type === "page") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading content...</p>
        </div>
      </div>
    )
  }

  if (type === "articles") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-secondary-200"></div>
            <div className="p-6">
              <div className="h-4 bg-secondary-200 rounded mb-2"></div>
              <div className="h-4 bg-secondary-200 rounded w-2/3 mb-4"></div>
              <div className="h-3 bg-secondary-200 rounded mb-2"></div>
              <div className="h-3 bg-secondary-200 rounded mb-2"></div>
              <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-200 border-t-primary-600"></div>
    </div>
  )
}