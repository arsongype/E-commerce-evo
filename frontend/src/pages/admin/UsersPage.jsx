import { useState, useEffect } from 'react'
import { FiSearch, FiTrash2, FiUser, FiCalendar } from 'react-icons/fi'
import { userAPI } from '../../api/user.api'
// Button not used in this file
// import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'
import toast from 'react-hot-toast'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)
      const data = await userAPI.getAll()
      const list = Array.isArray(data) ? data : data?.content || []
      setUsers(list)
    } catch (error) {
      console.error('Failed to load users:', error)
      setError(error?.response?.data?.message || error.message || 'Impossible de charger les utilisateurs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const user = users.find((u) => u.id === id)
    if (!confirm(`Supprimer l'utilisateur ${user?.firstName} ${user?.lastName} ?`)) return
    try {
      await userAPI.delete(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
      toast.success('Utilisateur supprime')
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.error(error?.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const filteredUsers = users.filter(u =>
    u.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-gray-600 mt-1">{users.length} utilisateurs au total</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={loadUsers} className="text-primary-600 hover:text-primary-700 font-medium">
              Reessayer
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aucun utilisateur trouve.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-sm font-bold text-primary-700 flex-shrink-0">
                    {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{user.firstName} {user.lastName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={user.role === 'ADMIN' ? 'danger' : 'primary'} size="xs">
                        {user.role === 'ADMIN' ? 'Admin' : 'Client'}
                      </Badge>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : '-'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleDelete(user.id)}
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
