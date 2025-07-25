import React from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"

export default function ArticleCard({ article }) {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "Recent"
    }
  }

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {article.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-secondary-500 mb-3">
          <ApperIcon name="Calendar" className="w-4 h-4" />
          <span>{formatDate(article.publishDate)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
          <Link to={`/article/${createSlug(article.title)}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className="text-secondary-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <Link
          to={`/article/${createSlug(article.title)}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          Read More
          <ApperIcon name="ArrowRight" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}