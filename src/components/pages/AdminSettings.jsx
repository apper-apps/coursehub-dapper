import React, { useState, useEffect } from "react"
import AdminLayout from "@/components/organisms/AdminLayout"
import { settingsService } from "@/services/api/settingsService"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    affiliateLink: "",
    affiliateButtonText: "",
    siteName: "",
    siteDescription: ""
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await settingsService.getSettings()
      setSettings(data)
    } catch (err) {
      setError("Failed to load settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await settingsService.updateSettings(settings)
      toast.success("Settings saved successfully!")
    } catch (err) {
      toast.error("Failed to save settings. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const testAffiliateLink = () => {
    if (settings.affiliateLink) {
      window.open(settings.affiliateLink, "_blank", "noopener,noreferrer")
    } else {
      toast.warning("Please enter an affiliate link first.")
    }
  }

  if (loading) return <AdminLayout><Loading /></AdminLayout>
  if (error) return <AdminLayout><Error message={error} onRetry={loadSettings} /></AdminLayout>

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Settings</h1>
            <p className="text-secondary-600 mt-1">
              Configure your affiliate links and site information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Affiliate Settings */}
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                    <ApperIcon name="ExternalLink" className="w-5 h-5 text-primary-600" />
                    Affiliate Settings
                  </h2>
                  
                  <div className="space-y-4">
                    <FormField
                      label="Domestika Affiliate Link"
                      name="affiliateLink"
                      value={settings.affiliateLink}
                      onChange={handleInputChange}
                      placeholder="https://www.domestika.org/en/referrals/your-code"
                      required
                    />
                    
                    <FormField
                      label="Affiliate Button Text"
                      name="affiliateButtonText"
                      value={settings.affiliateButtonText}
                      onChange={handleInputChange}
                      placeholder="Explore Domestika Courses"
                    />
                    
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={testAffiliateLink}
                      >
                        <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                        Test Link
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-secondary-200 pt-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                    <ApperIcon name="Globe" className="w-5 h-5 text-primary-600" />
                    Site Information
                  </h2>
                  
                  <div className="space-y-4">
                    <FormField
                      label="Site Name"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleInputChange}
                      placeholder="CourseHub Pro"
                    />
                    
                    <FormField
                      label="Site Description"
                      type="textarea"
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleInputChange}
                      placeholder="Your trusted source for discovering amazing Domestika courses..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-secondary-200">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview & Help */}
          <div className="space-y-6">
            {/* Button Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Button Preview
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-secondary-600 mb-3">How it will appear:</p>
                  <button
                    disabled
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <ApperIcon name="ExternalLink" className="w-4 h-4" />
                    {settings.affiliateButtonText || "Explore Domestika Courses"}
                  </button>
                </div>
              </div>
            </div>

            {/* Help & Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <ApperIcon name="HelpCircle" className="w-5 h-5 text-primary-600" />
                Help & Tips
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">
                    Getting Your Affiliate Link
                  </h4>
                  <ul className="text-secondary-600 space-y-1">
                    <li>• Sign up for the Domestika affiliate program</li>
                    <li>• Get your unique referral link</li>
                    <li>• Paste it in the affiliate link field above</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">
                    Button Best Practices
                  </h4>
                  <ul className="text-secondary-600 space-y-1">
                    <li>• Keep button text clear and action-oriented</li>
                    <li>• Use words like "Explore", "Discover", "Learn"</li>
                    <li>• Test your link regularly to ensure it works</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <ApperIcon name="Info" className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium mb-1">Note</p>
                      <p className="text-blue-700 text-xs">
                        The affiliate button will appear on your homepage and article pages 
                        to maximize conversion opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}