import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const CartPage = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()
  const { isAuthenticated } = useAuth()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Decouvrez nos produits et ajoutez-les a votre panier pour commencer vos achats.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg" leftIcon={<FiArrowLeft className="w-5 h-5" />}>
              Continuer le shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Panier
            </h1>
            <p className="text-gray-600 mt-1">
              {totalItems} article{totalItems !== 1 ? 's' : ''} dans votre panier
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-danger-600 hover:text-danger-700 font-semibold flex items-center gap-1.5"
          >
            <FiTrash2 className="w-4 h-4" />
            Vider le panier
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                        <img
                           src={item.imageUrl || '/images/placeholder.svg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-lg font-semibold text-gray-900 hover:text-primary-600 line-clamp-1 transition-colors"
                      >
                        {item.name}
                      </Link>
                      
                      <p className="text-sm text-gray-500 mt-1">
                        Prix unitaire: {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        }).format(item.price)}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2.5 hover:bg-gray-100 disabled:opacity-50 rounded-l-xl transition-colors"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2.5 min-w-[3rem] text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="p-2.5 hover:bg-gray-100 disabled:opacity-50 rounded-r-xl transition-colors"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Subtotal & Remove */}
                        <div className="flex items-center gap-6">
                          <span className="text-xl font-bold text-gray-900">
                            {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            }).format(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link
              to="/shop"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold mt-4"
            >
              <FiArrowLeft className="mr-2" />
              Continuer le shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resume de la commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-600 font-semibold">Gratuite</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(totalPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">TVA incluse</p>
                </div>
              </div>

              {/* Promo Code */}
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code promo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <Button variant="outline" size="sm">
                    Appliquer
                  </Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to={isAuthenticated ? '/checkout' : '/login'} className="block mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="mt-4"
                >
                  Procéder au paiement
                </Button>
              </Link>

              {/* Payment Methods */}
              <div className="pt-4">
                <p className="text-xs text-gray-500 text-center mb-2">
                  Paiement sécurisé
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary" size="sm">Visa</Badge>
                  <Badge variant="secondary" size="sm">Mastercard</Badge>
                  <Badge variant="secondary" size="sm">PayPal</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
