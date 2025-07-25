import React from "react"
import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

export default function Footer() {
  return (
<footer className="bg-secondary-50 text-secondary-700 border-t border-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <ApperIcon name="BookOpen" className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-secondary-900">CourseHub Pro</span>
            </div>
            <p className="text-secondary-600 mb-6 max-w-md leading-relaxed">
              Your trusted source for discovering and exploring the best Domestika courses. 
              Learn new skills, unleash your creativity, and advance your career with expert-led online courses.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-500 hover:text-secondary-700 transition-colors"
              >
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-500 hover:text-secondary-700 transition-colors"
              >
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-500 hover:text-secondary-700 transition-colors"
              >
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-secondary-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-secondary-900 mb-4">Contact</h3>
            <div className="space-y-3 text-secondary-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" className="w-4 h-4" />
                <span>hello@coursehubpro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Globe" className="w-4 h-4" />
                <span>www.coursehubpro.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-200 pt-8 mt-12 text-center text-secondary-500">
          <p>&copy; 2024 CourseHub Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}