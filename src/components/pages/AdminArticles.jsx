import React, { useState, useEffect } from "react"
import AdminLayout from "@/components/organisms/AdminLayout"
import { articlesService } from "@/services/api/articlesService"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import RichTextEditor from "@/components/molecules/RichTextEditor"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"
import { format } from "date-fns"

export default function AdminArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "draft"
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await articlesService.getAll()
      const sortedArticles = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      setArticles(sortedArticles)
    } catch (err) {
      setError("Failed to load articles. Please try again.")
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

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const articleData = {
        ...formData,
        publishDate: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      if (editingArticle) {
        await articlesService.update(editingArticle.Id, articleData)
        toast.success("Article updated successfully!")
      } else {
        await articlesService.create(articleData)
        toast.success("Article created successfully!")
      }

      setShowForm(false)
      setEditingArticle(null)
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        status: "draft"
      })
      loadArticles()
    } catch (err) {
      toast.error("Failed to save article. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      featuredImage: article.featuredImage || "",
      status: article.status
    })
    setShowForm(true)
  }

  const handleDelete = async (articleId) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      await articlesService.delete(articleId)
      toast.success("Article deleted successfully!")
      loadArticles()
    } catch (err) {
      toast.error("Failed to delete article. Please try again.")
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingArticle(null)
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      status: "draft"
    })
  }

  if (loading) return <AdminLayout><Loading /></AdminLayout>
  if (error) return <AdminLayout><Error message={error} onRetry={loadArticles} /></AdminLayout>

  return (
    <AdminLayout>
      <div className="space-y-8">
        {!showForm ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900">Articles</h1>
                <p className="text-secondary-600 mt-1">
                  Create and manage your blog content
                </p>
              </div>
              <Button onClick={() => setShowForm(true)}>
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </div>

            {/* Articles List */}
            {articles.length === 0 ? (
              <Empty
                title="No Articles Yet"
                description="Start creating engaging content to promote Domestika courses."
                icon="FileText"
                action={
                  <Button onClick={() => setShowForm(true)}>
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Create Your First Article
                  </Button>
                }
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50 border-b border-secondary-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-secondary-900">Title</th>
                        <th className="text-left py-4 px-6 font-medium text-secondary-900">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-secondary-900">Updated</th>
                        <th className="text-right py-4 px-6 font-medium text-secondary-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-200">
                      {articles.map((article) => (
                        <tr key={article.Id} className="hover:bg-secondary-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {article.featuredImage && (
                                <img
                                  src={article.featuredImage}
                                  alt=""
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium text-secondary-900">{article.title}</p>
                                {article.excerpt && (
                                  <p className="text-sm text-secondary-600 truncate max-w-md">
                                    {article.excerpt}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              article.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                article.status === "published" ? "bg-green-500" : "bg-yellow-500"
                              }`}></div>
                              {article.status === "published" ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-secondary-600">
                            {format(new Date(article.updatedAt), "MMM dd, yyyy")}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(article)}
                              >
                                <ApperIcon name="Edit" className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(article.Id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <ApperIcon name="Trash2" className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Article Form */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900">
                  {editingArticle ? "Edit Article" : "New Article"}
                </h1>
                <p className="text-secondary-600 mt-1">
                  {editingArticle ? "Update your article content" : "Create engaging content for your readers"}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button form="article-form" type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                      {editingArticle ? "Update" : "Create"}
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <FormField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter article title..."
                    />

                    <FormField
                      label="Excerpt"
                      type="textarea"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Brief description of the article..."
                      className="min-h-[80px]"
                    />

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <FormField
                      label="Featured Image URL"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />

                    {formData.featuredImage && (
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Preview
                        </label>
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none"
                          }}
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}