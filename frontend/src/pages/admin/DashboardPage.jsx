import { useState, useEffect } from 'react'
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp, FiArrowUpRight } from 'react-icons/fi'
import { statsAPI } from '../../api/stats.api'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    popularProducts: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await statsAPI.getDashboardStats()
        setStats({
          totalProducts: data.totalProducts || 0,
          totalOrders: data.totalOrders || 0,
          totalUsers: data.totalUsers || 0,
          totalRevenue: data.totalRevenue || 0,
          recentOrders: data.recentOrders || [],
          popularProducts: data.popularProducts || [],
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
        setError(error?.response?.data?.message || error.message || 'Impossible de charger les statistiques')
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const cards = [
    {
      title: 'Produits',
      value: stats.totalProducts,
      icon: FiPackage,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Commandes',
      value: stats.totalOrders,
      icon: FiShoppingCart,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'bg-purple-500',
      change: '+25%',
    },
    {
      title: 'Revenus',
      value: `${new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(stats.totalRevenue)}`,
      icon: FiDollarSign,
      color: 'bg-amber-500',
      change: '+18%',
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-red-600">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-primary-600 hover:text-primary-700 font-medium">
          Reessayer
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bienvenue dans l'administration</p>
        </div>
        <Button variant="primary">
          <FiTrendingUp className="mr-2" />
          Voir les rapports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-xl text-white`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <FiArrowUpRight className="w-3.5 h-3.5" />
                {card.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Dernières commandes</h2>
          <div className="space-y-4">
            {stats.recentOrders.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune commande récente</p>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">Commande #{order.orderNumber || order.id}</p>
                    <p className="text-xs text-gray-500">Client {order.user?.firstName || order.user?.email || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(order.totalAmount || 0)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {order.status || 'En cours'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Produits populaires</h2>
          <div className="space-y-4">
            {stats.popularProducts.length === 0 ? (
              <p className="text-sm text-gray-500">Aucun produit populaire</p>
            ) : (
              stats.popularProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">Ventes: {product.reviewCount || 0}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
