import mockSettings from "@/services/mockData/settings.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class SettingsService {
  constructor() {
    this.settings = { ...mockSettings }
  }

  async getSettings() {
    await delay(200)
    return { ...this.settings }
  }

  async updateSettings(settingsData) {
    await delay(400)
    this.settings = {
      ...this.settings,
      ...settingsData,
      updatedAt: new Date().toISOString()
    }
    return { ...this.settings }
  }
}

export const settingsService = new SettingsService()