import React, { useState, useEffect } from "react"
import { articlesService } from "@/services/api/articlesService"
import ArticleCard from "@/components/molecules/ArticleCard"
import AffiliateButton from "@/components/molecules/AffiliateButton"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await articlesService.getAll()
      // Filter only published articles and sort by date
      const publishedArticles = data
        .filter(article => article.status === "published")
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      setArticles(publishedArticles)
    } catch (err) {
      setError("Failed to load articles. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading type="articles" />
  if (error) return <Error message={error} onRetry={loadArticles} />

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-semibold text-secondary-900 mb-6">
              Discover Amazing
              <span className="text-primary-600 block">Domestika Courses</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Unlock your creative potential with expert-led online courses. From design and illustration 
              to photography and crafts, find the perfect course to advance your skills.
            </p>
            <AffiliateButton />
          </div>
        </div>
      </section>

      {/* Articles Section */}
<section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium text-secondary-900 mb-6">
              Latest Articles
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest course reviews, learning tips, and creative insights 
              to help you choose the perfect Domestika course.
            </p>
          </div>

          {articles.length === 0 ? (
            <Empty
              title="No Articles Yet"
              description="We're working on creating amazing content for you. Check back soon for the latest course reviews and learning tips!"
              icon="FileText"
              action={
                <AffiliateButton />
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.Id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

{/* CTA Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-medium text-secondary-900 mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-secondary-600 mb-12 leading-relaxed">
            Join thousands of creatives and start your journey with Domestika today. 
            Explore courses in design, illustration, photography, and more.
          </p>
          <AffiliateButton />
        </div>
      </section>
      {/* Fixed Affiliate Button */}
      <AffiliateButton fixed />
    </div>
  )
}