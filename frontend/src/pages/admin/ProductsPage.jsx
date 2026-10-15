import { useEffect, useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiPackage } from 'react-icons/fi'
import { productAPI } from '../../api/product.api'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [form, setForm] = useState({
    name: '',
    price: 0,
    stockQuantity: 0,
    categoryId: null,
    description: '',
  })
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await productAPI.getAll({ size: 100 })
      const list = res.content || res
      setProducts(list)
      const cats = await productAPI.getCategories()
      const categoriesList = Array.isArray(cats) ? cats : cats.content || []
      setCategories(categoriesList)
      setForm((prev) => ({
        ...prev,
        categoryId: categoriesList.length > 0 ? categoriesList[0].id : null,
      }))
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchData()
    }

    load()

    return () => {
      // cleanup placeholder if needed in future
    }
  }, [])

  const startEdit = (product) => {
    setEditing(product)
    setForm({
      name: product.name || '',
      price: product.price || 0,
      stockQuantity: product.stockQuantity || 0,
      categoryId: product.category?.id || categories[0]?.id || null,
      description: product.description || '',
    })
    setFile(null)
    setPreviewUrl(product.images?.[0] || product.imageUrl || null)
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setEditing(null)
    setForm({ name: '', price: 0, stockQuantity: 0, categoryId: categories[0]?.id || null, description: '' })
    setFile(null)
    setPreviewUrl(null)
    setIsModalOpen(false)
  }

  const openNew = () => {
    setEditing(null)
    setForm({ name: '', price: 0, stockQuantity: 0, categoryId: categories[0]?.id || null, description: '' })
    setFile(null)
    setPreviewUrl(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!form.name || !form.price || !form.categoryId) {
        alert('Veuillez remplir tous les champs obligatoires')
        return
      }
      let savedId = null
      if (editing) {
        const payload = {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          originalPrice: editing.originalPrice || null,
          sku: editing.sku || `SKU-${Date.now()}`,
          imageUrl: editing.imageUrl || null,
          categoryId: form.categoryId ? parseInt(form.categoryId, 10) : null,
          stockQuantity: parseInt(form.stockQuantity, 10) || 0,
          isNew: editing.isNew || false,
          featured: editing.featured || false,
        }
        await productAPI.update(editing.id, payload)
        savedId = editing.id
      } else {
        const payload = {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          originalPrice: null,
          sku: `SKU-${Date.now()}`,
          imageUrl: null,
          categoryId: form.categoryId ? parseInt(form.categoryId, 10) : null,
          stockQuantity: parseInt(form.stockQuantity, 10) || 0,
          isNew: false,
          featured: false,
        }
        const res = await productAPI.create(payload)
        savedId = res?.id || null
      }

      await fetchData()

      if (!savedId) {
        const found = products.find((p) => p.name === form.name)
        if (found) savedId = found.id
      }

      if (file && savedId) {
        try {
          const fd = new FormData()
          fd.append('image', file)
          await productAPI.uploadImage(savedId, fd)
          await fetchData()
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr)
          alert("L'upload de l'image a echoue")
        }
      }

      resetForm()
    } catch (err) {
      console.error('Failed to save product:', err)
      const message = err?.response?.data?.message || err?.message || 'Erreur lors de la sauvegarde du produit'
      alert(message)
    }
  }

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null
    setFile(f)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    try {
      await productAPI.delete(id)
      await fetchData()
    } catch (err) {
      console.error('Failed to delete product:', err)
      alert('Erreur lors de la suppression')
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des produits</h1>
          <p className="text-gray-600 mt-1">{products.length} produits au total</p>
        </div>
        <Button variant="primary" onClick={openNew} leftIcon={<FiPlus className="w-4 h-4" />}>
          Ajouter un produit
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={resetForm} title={editing ? 'Modifier produit' : 'Nouveau produit'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nom du produit"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prix"
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              required
            />
            <Input
              label="Stock"
              type="number"
              value={form.stockQuantity}
              onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
            <select
              value={form.categoryId || ''}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value ? parseInt(e.target.value, 10) : null })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description du produit..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
            {previewUrl && (
              <div className="mt-3">
                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="success" className="flex-1">
              Enregistrer
            </Button>
            <Button type="button" variant="secondary" onClick={resetForm}>
              Annuler
            </Button>
          </div>
        </form>
      </Modal>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Liste des produits</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-2xl mb-4">
              <FiPackage className="w-6 h-6 text-primary-600 animate-pulse" />
            </div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPackage className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Aucun produit trouve.</p>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={p.images?.[0] || p.imageUrl || '/images/placeholder.svg'}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate">{p.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="primary" size="xs">{p.category?.name || '—'}</Badge>
                        <span className="text-xs text-gray-500">Stock: {p.stockQuantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="text-sm font-semibold text-gray-900 mr-2 hidden sm:block">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p.price)}
                    </div>
                    <button
                      onClick={() => startEdit(p)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
