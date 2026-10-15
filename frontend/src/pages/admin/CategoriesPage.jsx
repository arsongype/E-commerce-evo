import { useState, useEffect } from 'react'
import { FiEdit, FiTrash2, FiTag } from 'react-icons/fi'
import { categoryAPI } from '../../api/category.api'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Spinner from '../../components/ui/Spinner'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      setLoading(true)
      const data = await categoryAPI.getAll()
      setCategories(Array.isArray(data) ? data : data?.content || [])
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    try {
      if (editingId) {
        await categoryAPI.update(editingId, { name })
      } else {
        await categoryAPI.create({ name })
      }
      setName('')
      setEditingId(null)
      await loadCategories()
    } catch (error) {
      console.error('Failed to save category:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
    setName(category.name)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette categorie ?')) return
    try {
      await categoryAPI.delete(id)
      await loadCategories()
    } catch (error) {
      console.error('Failed to delete category:', error)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des categories</h1>
          <p className="text-gray-600 mt-1">{categories.length} categories au total</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la categorie"
            className="flex-1"
          />
          <Button type="submit" variant={editingId ? 'success' : 'primary'} leftIcon={<FiEdit className="w-4 h-4" />}>
            {editingId ? 'Modifier' : 'Ajouter'}
          </Button>
          {editingId && (
            <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setName('') }}>
              Annuler
            </Button>
          )}
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Spinner size="lg" />
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTag className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aucune categorie trouvee.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FiTag className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.productCount || 0} produits</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
