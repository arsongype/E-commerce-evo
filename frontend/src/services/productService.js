import { products, categories } from '../data/mockData'

function sortProducts(list, sort) {
  const sorted = [...list]
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name, 'fr'))
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}

function filterProducts(params = {}) {
  const { search, category, minPrice, maxPrice } = params
  let filtered = [...products, ...getStoredProducts()]

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    )
  }

  if (category) {
    const catId = parseInt(category, 10)
    filtered = filtered.filter((p) => p.category?.id === catId)
  }

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= parseFloat(minPrice))
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice))
  }

  return sortProducts(filtered, params.sort)
}

function paginate(list, page = 0, size = 20) {
  const start = page * size
  return {
    content: list.slice(start, start + size),
    totalElements: list.length,
    totalPages: Math.ceil(list.length / size) || 1,
    number: page,
    size,
  }
}

const PRODUCTS_KEY = 'shopease_products'
const CATEGORIES_KEY = 'shopease_categories'

function getStoredProducts() {
  try {
    return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveStoredProducts(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list))
}

function getStoredCategories() {
  try {
    return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]')
  } catch {
    return []
  }
}

let _categories = categories

function syncCategories() {
  const stored = getStoredCategories()
  if (stored.length > 0) {
    _categories = stored
  }
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)
}

export const productService = {
  getAll(params = {}) {
    syncCategories()
    const { page = 0, size = 20 } = params
    const filtered = filterProducts(params, _categories)
    return paginate(filtered, page, size)
  },

  getById(id) {
    syncCategories()
    const product = [...products, ...getStoredProducts()].find((p) => p.id === parseInt(id, 10))
    if (!product) throw new Error('Produit non trouve')
    return product
  },

  getFeatured() {
    syncCategories()
    return [...products, ...getStoredProducts()].filter((p) => p.featured)
  },

  getNewArrivals() {
    syncCategories()
    return [...products, ...getStoredProducts()].filter((p) => p.isNew)
  },

  getCategories() {
    syncCategories()
    return _categories
  },

  create(productData) {
    syncCategories()
    const list = getStoredProducts()
    const maxId = list.reduce((max, p) => Math.max(max, p.id || 0), 0)
    const newProduct = {
      id: maxId + 1,
      name: productData.name,
      slug: generateSlug(productData.name),
      description: productData.description || '',
      price: parseFloat(productData.price),
      originalPrice: productData.originalPrice || null,
      sku: productData.sku || `SKU-${Date.now()}`,
      imageUrl: productData.imageUrl || null,
      category: _categories.find((c) => c.id === parseInt(productData.categoryId, 10)) || null,
      categoryId: productData.categoryId ? parseInt(productData.categoryId, 10) : null,
      stockQuantity: parseInt(productData.stockQuantity, 10) || 0,
      rating: 0,
      reviewCount: 0,
      isNew: productData.isNew || false,
      featured: productData.featured || false,
      createdAt: new Date().toISOString(),
      images: productData.imageUrl ? [productData.imageUrl] : [],
    }
    list.unshift(newProduct)
    saveStoredProducts(list)
    return newProduct
  },

  update(id, productData) {
    syncCategories()
    const list = getStoredProducts()
    const index = list.findIndex((p) => p.id === parseInt(id, 10))
    if (index >= 0) {
      list[index] = {
        ...list[index],
        name: productData.name || list[index].name,
        description: productData.description ?? list[index].description,
        price: productData.price != null ? parseFloat(productData.price) : list[index].price,
        originalPrice: productData.originalPrice ?? list[index].originalPrice,
        sku: productData.sku || list[index].sku,
        imageUrl: productData.imageUrl ?? list[index].imageUrl,
        categoryId: productData.categoryId ? parseInt(productData.categoryId, 10) : list[index].categoryId,
        category: productData.categoryId ? _categories.find((c) => c.id === parseInt(productData.categoryId, 10)) || list[index].category : list[index].category,
        stockQuantity: productData.stockQuantity != null ? parseInt(productData.stockQuantity, 10) : list[index].stockQuantity,
        isNew: productData.isNew ?? list[index].isNew,
        featured: productData.featured ?? list[index].featured,
      }
      saveStoredProducts(list)
      return list[index]
    }
    throw new Error('Produit non trouve')
  },

  delete(id) {
    const list = getStoredProducts().filter((p) => p.id !== parseInt(id, 10))
    saveStoredProducts(list)
    return { message: 'Produit supprime' }
  },
}
