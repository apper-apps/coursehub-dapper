import mockPages from "@/services/mockData/pages.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PagesService {
  constructor() {
    this.pages = [...mockPages]
  }

  async getAll() {
    await delay(300)
    return [...this.pages]
  }

  async getBySlug(slug) {
    await delay(200)
    const page = this.pages.find(item => item.slug === slug)
    if (!page) {
      // Create default page if not found
      const defaultPage = {
        Id: Math.max(...this.pages.map(item => item.Id), 0) + 1,
        slug: slug,
        title: this.getDefaultTitle(slug),
        content: "",
        updatedAt: new Date().toISOString()
      }
      this.pages.push(defaultPage)
      return { ...defaultPage }
    }
    return { ...page }
  }

  async update(slug, pageData) {
    await delay(400)
    const index = this.pages.findIndex(item => item.slug === slug)
    
    if (index === -1) {
      // Create new page if not found
      const newId = Math.max(...this.pages.map(item => item.Id), 0) + 1
      const newPage = {
        Id: newId,
        slug: slug,
        ...pageData,
        updatedAt: new Date().toISOString()
      }
      this.pages.push(newPage)
      return { ...newPage }
    }
    
    this.pages[index] = {
      ...this.pages[index],
      ...pageData,
      slug: slug,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.pages[index] }
  }

  getDefaultTitle(slug) {
    const titles = {
      "about": "About Us",
      "contact": "Contact",
      "privacy": "Privacy Policy"
    }
    return titles[slug] || slug
  }
}

export const pagesService = new PagesService()