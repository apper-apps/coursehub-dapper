import React, { useState, useEffect } from "react"
import { pagesService } from "@/services/api/pagesService"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"

export default function AboutUs() {
  const [pageContent, setPageContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = async () => {
    try {
      setLoading(true)
      setError("")
      const page = await pagesService.getBySlug("about")
      setPageContent(page.content)
    } catch (err) {
      setError("Failed to load page content.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPage} />

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Users" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            About Us
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
          {pageContent ? (
            <div
              className="editor-content"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Edit" className="w-8 h-8 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Content Coming Soon
              </h3>
              <p className="text-secondary-600 max-w-md mx-auto">
                We're working on creating amazing content for this page. 
                Check back soon for more information about our mission and team.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}