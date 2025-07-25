import React from "react"
import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CourseHub Pro</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Your trusted source for discovering and exploring the best Domestika courses. 
              Learn new skills, unleash your creativity, and advance your career with expert-led online courses.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-secondary-300">
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

        <div className="border-t border-secondary-700 pt-8 mt-8 text-center text-secondary-400">
          <p>&copy; 2024 CourseHub Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}