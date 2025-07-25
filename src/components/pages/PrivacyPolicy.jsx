import React, { useState, useEffect } from "react"
import { pagesService } from "@/services/api/pagesService"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"

export default function PrivacyPolicy() {
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
      const page = await pagesService.getBySlug("privacy")
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
            <ApperIcon name="Shield" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-secondary-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
          {pageContent ? (
            <div
              className="editor-content"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          ) : (
            <div className="space-y-8">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Edit" className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Privacy Policy Coming Soon
                </h3>
                <p className="text-secondary-600 max-w-md mx-auto">
                  We're working on creating a comprehensive privacy policy. 
                  In the meantime, please contact us with any privacy-related questions.
                </p>
              </div>
              
              <div className="border-t border-secondary-200 pt-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Quick Overview
                </h3>
                <div className="space-y-4 text-secondary-600">
                  <p>
                    CourseHub Pro is committed to protecting your privacy and ensuring the security of your personal information.
                  </p>
                  <p>
                    We only collect information necessary to provide you with the best possible experience when discovering Domestika courses.
                  </p>
                  <p>
                    Your personal information is never shared with third parties without your explicit consent.
                  </p>
                  <p>
                    If you have any questions about our privacy practices, please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}