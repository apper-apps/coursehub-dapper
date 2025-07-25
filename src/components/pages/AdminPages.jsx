import React, { useState, useEffect } from "react"
import AdminLayout from "@/components/organisms/AdminLayout"
import { pagesService } from "@/services/api/pagesService"
import Button from "@/components/atoms/Button"
import RichTextEditor from "@/components/molecules/RichTextEditor"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"
import { cn } from "@/utils/cn"

export default function AdminPages() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activePageSlug, setActivePageSlug] = useState("about")
  const [pageContent, setPageContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const availablePages = [
    { slug: "about", title: "About Us", icon: "Users" },
    { slug: "contact", title: "Contact", icon: "Mail" },
    { slug: "privacy", title: "Privacy Policy", icon: "Shield" }
  ]

  useEffect(() => {
    loadPages()
  }, [])

  useEffect(() => {
    loadPageContent(activePageSlug)
  }, [activePageSlug])

  const loadPages = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await pagesService.getAll()
      setPages(data)
    } catch (err) {
      setError("Failed to load pages. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const loadPageContent = async (slug) => {
    try {
      const page = await pagesService.getBySlug(slug)
      setPageContent(page.content || "")
      setHasUnsavedChanges(false)
    } catch (err) {
      setPageContent("")
      setHasUnsavedChanges(false)
    }
  }

  const handleContentChange = (content) => {
    setPageContent(content)
    setHasUnsavedChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const pageData = {
        slug: activePageSlug,
        title: availablePages.find(p => p.slug === activePageSlug)?.title || activePageSlug,
        content: pageContent,
        updatedAt: new Date().toISOString()
      }

      await pagesService.update(activePageSlug, pageData)
      toast.success("Page updated successfully!")
      setHasUnsavedChanges(false)
      loadPages()
    } catch (err) {
      toast.error("Failed to save page. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handlePageSwitch = (slug) => {
    if (hasUnsavedChanges) {
      if (!confirm("You have unsaved changes. Are you sure you want to switch pages?")) {
        return
      }
    }
    setActivePageSlug(slug)
  }

  if (loading) return <AdminLayout><Loading /></AdminLayout>
  if (error) return <AdminLayout><Error message={error} onRetry={loadPages} /></AdminLayout>

  const activePage = availablePages.find(p => p.slug === activePageSlug)

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Pages</h1>
            <p className="text-secondary-600 mt-1">
              Manage your static website content
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={hasUnsavedChanges ? "animate-pulse" : ""}
          >
            {saving ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Page Navigation */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Pages</h2>
            <nav className="space-y-2">
              {availablePages.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => handlePageSwitch(page.slug)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                    activePageSlug === page.slug
                      ? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                      : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
                  )}
                >
                  <ApperIcon
                    name={page.icon}
                    className={cn(
                      "w-4 h-4",
                      activePageSlug === page.slug ? "text-primary-500" : "text-secondary-400"
                    )}
                  />
                  <span className="font-medium">{page.title}</span>
                  {activePageSlug === page.slug && hasUnsavedChanges && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full ml-auto"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Page Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <ApperIcon name={activePage?.icon} className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900">
                    {activePage?.title}
                  </h2>
                  <p className="text-sm text-secondary-600">
                    Edit the content for your {activePage?.title.toLowerCase()} page
                  </p>
                </div>
              </div>

              {hasUnsavedChanges && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <ApperIcon name="AlertTriangle" className="w-4 h-4" />
                    <span className="text-sm font-medium">You have unsaved changes</span>
                  </div>
                </div>
              )}

              <RichTextEditor
                value={pageContent}
                onChange={handleContentChange}
                className="min-h-[500px]"
              />

              <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                <h3 className="text-sm font-medium text-secondary-900 mb-2">
                  Content Guidelines
                </h3>
                <ul className="text-sm text-secondary-600 space-y-1">
                  <li>• Keep content informative and engaging for your visitors</li>
                  <li>• Use headings to structure your content for better readability</li>
                  <li>• Include relevant information that builds trust with your audience</li>
                  <li>• Make sure to save your changes before switching to another page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}