import React from "react"
import ApperIcon from "@/components/ApperIcon"

export default function Empty({ 
  title = "No content found", 
  description = "There's nothing here yet.", 
  action,
  icon = "FileText"
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} className="w-8 h-8 text-secondary-400" />
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">{title}</h3>
        <p className="text-secondary-600 mb-6">{description}</p>
        {action}
      </div>
    </div>
  )
}