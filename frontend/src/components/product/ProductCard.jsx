import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToCart } = useCart()

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="group relative bg-white dark:bg-surface-800 rounded-3xl shadow-soft hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700/50"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.images?.[0] || product.imageUrl || '/images/placeholder.svg'}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="primary" size="sm" dot>
              Nouveau
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="danger" size="sm">
              -{discount}%
            </Badge>
          )}
          {product.stockQuantity != null && product.stockQuantity <= 5 && product.stockQuantity > 0 && (
            <Badge variant="warning" size="sm">
              Presque épuisé
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-400 ${
          'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
        }`}>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2.5 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
              isWishlisted 
                ? 'bg-danger-500 text-white shadow-danger-500/30' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-danger-50 dark:hover:bg-danger-950 hover:text-danger-500'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>

        {/* Out of Stock Overlay */}
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="danger" size="md" className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
              Rupture de stock
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <Link to={`/shop?category=${product.category.id}`}>
            <Badge variant="primary" size="xs" className="mb-2">
              {product.category.name}
            </Badge>
          </Link>
        )}
        
        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-warning-500 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <Button
            variant={product.stockQuantity === 0 ? 'secondary' : 'primary'}
            size="md"
            className="w-full"
            disabled={product.stockQuantity === 0}
            onClick={() => addToCart(product)}
            leftIcon={<FiShoppingCart className="w-4 h-4" />}
          >
            {product.stockQuantity === 0 ? 'Indisponible' : 'Ajouter au panier'}
          </Button>
        </div>
      </div>
    </div>
  )
}