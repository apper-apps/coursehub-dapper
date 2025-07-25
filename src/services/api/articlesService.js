import mockArticles from "@/services/mockData/articles.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ArticlesService {
  constructor() {
    this.articles = [...mockArticles]
  }

  async getAll() {
    await delay(300)
    return [...this.articles]
  }

  async getById(id) {
    await delay(200)
    const article = this.articles.find(item => item.Id === parseInt(id))
    if (!article) {
      throw new Error("Article not found")
    }
    return { ...article }
  }

  async create(articleData) {
    await delay(400)
    const newId = Math.max(...this.articles.map(item => item.Id), 0) + 1
    const newArticle = {
      Id: newId,
      ...articleData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.articles.push(newArticle)
    return { ...newArticle }
  }

  async update(id, articleData) {
    await delay(400)
    const index = this.articles.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Article not found")
    }
    
    this.articles[index] = {
      ...this.articles[index],
      ...articleData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.articles[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.articles.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Article not found")
    }
    
    const deletedArticle = this.articles.splice(index, 1)[0]
    return { ...deletedArticle }
  }
}

export const articlesService = new ArticlesService()