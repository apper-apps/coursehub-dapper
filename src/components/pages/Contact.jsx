import React, { useState, useEffect } from "react"
import { pagesService } from "@/services/api/pagesService"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

export default function Contact() {
  const [pageContent, setPageContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = async () => {
    try {
      setLoading(true)
      setError("")
      const page = await pagesService.getBySlug("contact")
      setPageContent(page.content)
    } catch (err) {
      setError("Failed to load page content.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPage} />

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Mail" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Have questions about our course recommendations or need help finding the perfect Domestika course? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Get in Touch
              </h2>
              
              {pageContent ? (
                <div
                  className="editor-content mb-8"
                  dangerouslySetInnerHTML={{ __html: pageContent }}
                />
              ) : (
                <div className="space-y-6 mb-8">
                  <p className="text-secondary-600">
                    We're here to help you discover the best Domestika courses for your creative journey. 
                    Whether you're looking for course recommendations, have questions about our content, 
                    or want to share your learning experience, don't hesitate to reach out.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Mail" className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Email</p>
                    <p className="font-medium text-secondary-900">hello@coursehubpro.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Clock" className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Response Time</p>
                    <p className="font-medium text-secondary-900">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Globe" className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Website</p>
                    <p className="font-medium text-secondary-900">www.coursehubpro.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
                
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
                
                <FormField
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us how we can help you..."
                  className="min-h-[120px]"
                />
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? (
                    <>
                      <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}