import { useState, useEffect } from 'react'
import { FiSearch, FiEye, FiPackage, FiUser, FiCreditCard, FiTruck, FiCheckCircle } from 'react-icons/fi'
import { orderAPI } from '../../api/order.api'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'
import toast from 'react-hot-toast'

const statusConfig = {
  PENDING: { label: 'En attente', color: 'warning' },
  CONFIRMED: { label: 'Confirmee', color: 'primary' },
  SHIPPED: { label: 'Expediee', color: 'info' },
  DELIVERED: { label: 'Livree', color: 'success' },
  CANCELLED: { label: 'Annulee', color: 'danger' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      setLoading(true)
      setError(null)
      const data = await orderAPI.getAllOrders()
      const list = Array.isArray(data) ? data : data?.content || []
      setOrders(list)
    } catch (error) {
      console.error('Failed to load orders:', error)
      setError(error?.response?.data?.message || error.message || 'Impossible de charger les commandes')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await orderAPI.updateOrderStatus(id, status)
      await loadOrders()
      toast.success(`Statut mis à jour : ${statusConfig[status]?.label || status}`)
    } catch (error) {
      console.error('Failed to update order status:', error)
      toast.error('Erreur lors de la mise à jour du statut')
    }
  }

  const filteredOrders = orders.filter(o =>
    o.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>
          <p className="text-gray-600 mt-1">{orders.length} commandes au total</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par numero, client..."
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
              <FiPackage className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={loadOrders} className="text-primary-600 hover:text-primary-700 font-medium">
              Reessayer
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aucune commande trouvee.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Commande</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const statusInfo = statusConfig[order.status] || statusConfig.PENDING
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <FiPackage className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">#{order.orderNumber || order.id}</p>
                            <p className="text-xs text-gray-500">{order.items?.length || 0} article(s)</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <FiUser className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.user?.firstName || 'Client'} {order.user?.lastName || ''}</p>
                            <p className="text-xs text-gray-500">{order.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(order.totalAmount || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={statusInfo.color} size="sm">{statusInfo.label}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                            title="Voir details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          {order.status === 'PENDING' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                              className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-xl transition-colors"
                              title="Valider le paiement"
                            >
                              <FiCreditCard className="w-4 h-4" />
                            </button>
                          )}
                          {order.status === 'CONFIRMED' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'SHIPPED')}
                              className="p-2 text-gray-400 hover:text-info-600 hover:bg-info-50 rounded-xl transition-colors"
                              title="Marquer expediee"
                            >
                              <FiTruck className="w-4 h-4" />
                            </button>
                          )}
                          {order.status === 'SHIPPED' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
                              className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-xl transition-colors"
                              title="Marquer livree"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Details de la commande</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Commande</p>
                <p className="font-medium text-gray-900">#{selectedOrder.orderNumber || selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium text-gray-900">{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
                <p className="text-sm text-gray-500">{selectedOrder.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse de livraison</p>
                <p className="font-medium text-gray-900">{selectedOrder.shippingAddress?.address || '-'}</p>
                <p className="text-sm text-gray-500">{selectedOrder.shippingAddress?.city || ''} {selectedOrder.shippingAddress?.zipCode || ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Articles</p>
                <div className="mt-2 space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name} x{item.quantity}</span>
                      <span className="font-medium text-gray-900">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(selectedOrder.totalAmount || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
