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
<div className="bg-white rounded-lg border border-secondary-100 overflow-hidden hover:border-secondary-200 transition-colors group">
      {article.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-secondary-500 mb-3">
          <ApperIcon name="Calendar" className="w-4 h-4" />
          <span>{formatDate(article.publishDate)}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-secondary-900 mb-3">
          <Link to={`/article/${createSlug(article.title)}`} className="hover:text-primary-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        
        <p className="text-secondary-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <Link
          to={`/article/${createSlug(article.title)}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-normal text-sm"
        >
          Read More
          <ApperIcon name="ArrowRight" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}