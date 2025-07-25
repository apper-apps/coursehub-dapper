import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "@/components/organisms/AdminLayout"
import { articlesService } from "@/services/api/articlesService"
import { pagesService } from "@/services/api/pagesService"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalPages: 0
  })
  const [recentArticles, setRecentArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [articles, pages] = await Promise.all([
        articlesService.getAll(),
        pagesService.getAll()
      ])

      const publishedArticles = articles.filter(a => a.status === "published")
      const draftArticles = articles.filter(a => a.status === "draft")

      setStats({
        totalArticles: articles.length,
        publishedArticles: publishedArticles.length,
        draftArticles: draftArticles.length,
        totalPages: pages.length
      })

      const recent = articles
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
      setRecentArticles(recent)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: "FileText",
      color: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      title: "Published",
      value: stats.publishedArticles,
      icon: "CheckCircle",
      color: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      title: "Drafts",
      value: stats.draftArticles,
      icon: "Edit",
      color: "bg-yellow-500",
      textColor: "text-yellow-600"
    },
    {
      title: "Pages",
      value: stats.totalPages,
      icon: "File",
      color: "bg-purple-500",
      textColor: "text-purple-600"
    }
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                <div className="h-8 bg-secondary-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
            <p className="text-secondary-600 mt-1">
              Welcome back! Here's what's happening with your content.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/articles">
              <Button>
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Recent Articles</h2>
              <Link
                to="/admin/articles"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentArticles.length > 0 ? (
                recentArticles.map((article) => (
                  <div key={article.Id} className="flex items-center gap-3 p-3 hover:bg-secondary-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                      article.status === "published" ? "bg-green-500" : "bg-yellow-500"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-900 truncate">
                        {article.title}
                      </p>
                      <p className="text-xs text-secondary-500">
                        {article.status === "published" ? "Published" : "Draft"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="FileText" className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-500">No articles yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Link
                to="/admin/articles"
                className="flex items-center gap-4 p-4 border-2 border-dashed border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Manage Articles</p>
                  <p className="text-sm text-secondary-600">Create and edit blog posts</p>
                </div>
              </Link>
              
              <Link
                to="/admin/pages"
                className="flex items-center gap-4 p-4 border-2 border-dashed border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name="File" className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Edit Pages</p>
                  <p className="text-sm text-secondary-600">Update static content</p>
                </div>
              </Link>
              
              <Link
                to="/admin/settings"
                className="flex items-center gap-4 p-4 border-2 border-dashed border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Settings" className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Settings</p>
                  <p className="text-sm text-secondary-600">Configure affiliate links</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}