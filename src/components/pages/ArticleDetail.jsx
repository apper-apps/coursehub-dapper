import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { format } from "date-fns"
import { articlesService } from "@/services/api/articlesService"
import AffiliateButton from "@/components/molecules/AffiliateButton"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadArticle()
  }, [slug])

  const loadArticle = async () => {
    try {
      setLoading(true)
      setError("")
      const articles = await articlesService.getAll()
      const found = articles.find(article => 
        createSlug(article.title) === slug && article.status === "published"
      )
      
      if (!found) {
        setError("Article not found")
        return
      }
      
      setArticle(found)
    } catch (err) {
      setError("Failed to load article. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy")
    } catch {
      return "Recent"
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadArticle} />
  if (!article) return <Error message="Article not found" />

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-600">
              Home
            </Link>
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-secondary-400" />
            <span className="text-secondary-700 truncate">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-secondary-500 mb-4">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <time>{formatDate(article.publishDate)}</time>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-6">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-secondary-600 leading-relaxed">
                {article.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="editor-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                Ready to Start Learning?
              </h3>
              <p className="text-secondary-600 mb-6">
                Discover amazing courses and unlock your creative potential with Domestika.
              </p>
              <AffiliateButton />
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-8 pt-8 border-t border-secondary-200">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Fixed Affiliate Button */}
      <AffiliateButton fixed />
    </div>
  )
}