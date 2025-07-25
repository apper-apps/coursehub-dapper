import React, { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { settingsService } from "@/services/api/settingsService"

export default function AffiliateButton({ className = "", fixed = false }) {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings()
      setSettings(data)
    } catch (error) {
      console.error("Failed to load settings:", error)
    }
  }

  const handleClick = () => {
    if (settings?.affiliateLink) {
      window.open(settings.affiliateLink, "_blank", "noopener,noreferrer")
    }
  }

  if (!settings?.affiliateLink) return null

  const buttonText = settings.affiliateButtonText || "Explore Domestika Courses"

  if (fixed) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleClick}
          className="shadow-2xl animate-pulse hover:animate-none"
          size="lg"
        >
          <ApperIcon name="ExternalLink" className="w-5 h-5 mr-2" />
          {buttonText}
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
      size="lg"
    >
      <ApperIcon name="ExternalLink" className="w-5 h-5 mr-2" />
      {buttonText}
    </Button>
  )
}