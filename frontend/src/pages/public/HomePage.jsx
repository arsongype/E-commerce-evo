import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiTruck, FiShield, FiRotateCcw, FiPhone, FiStar, FiShoppingBag } from 'react-icons/fi'
import { productAPI } from '../../api/product.api'
import { categoryAPI } from '../../api/category.api'
import ProductCard from '../../components/product/ProductCard'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
// removed unused Spinner and elys imports

const features = [
  {
    icon: FiTruck,
    title: 'Livraison Gratuite',
    description: 'A partir de 50€ d\'achat',
    color: 'bg-blue-500',
  },
  {
    icon: FiShield,
    title: 'Paiement Securise',
    description: 'Transactions cryptees SSL',
    color: 'bg-emerald-500',
  },
  {
    icon: FiRotateCcw,
    title: 'Retours Faciles',
    description: 'Sous 30 jours',
    color: 'bg-orange-500',
  },
  {
    icon: FiPhone,
    title: 'Support 24/7',
    description: 'A votre ecoute',
    color: 'bg-violet-500',
  },
]

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const [featuredRes, newArrivalsRes, categoriesRes] = await Promise.all([
          productAPI.getFeatured(),
          productAPI.getNewArrivals(),
          categoryAPI.getAll(),
        ])
        setFeaturedProducts(Array.isArray(featuredRes) ? featuredRes : featuredRes.content || [])
        setNewArrivals(Array.isArray(newArrivalsRes) ? newArrivalsRes : newArrivalsRes.content || [])
        setCategories(Array.isArray(categoriesRes) ? categoriesRes : categoriesRes.content || [])
      } catch (error) {
        console.error('Failed to fetch homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiShoppingBag className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge variant="primary" size="md" className="mb-6 bg-white/10 text-white border-white/20">
                Nouvelle collection 2026
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                Decouvrez le
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-accent-200">
                  Shopping
                </span>
                Nouvelle Generation
              </h1>
              <p className="text-lg text-primary-100 mb-10 max-w-lg leading-relaxed">
                Des milliers de produits selectionnes pour vous. Livraison rapide et paiement securise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Explorer la boutique
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/shop?sort=price_desc"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
                >
                  Voir les promos
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/20" />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-primary-100">
                    <span className="font-bold text-white text-lg">+10,000</span> clients satisfaits
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 lg:mt-0"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-white/20 to-white/5 rounded-[2.5rem] rotate-3 hidden sm:block" />
                <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-[2.5rem] -rotate-3 hidden sm:block" />
                <img
                  src="/images/elys.png"
                  alt="elys"
                  loading="lazy"
                  className="relative rounded-[2rem] shadow-2xl w- max-w-lg mx-auto border border-white/10"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.color} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="primary" size="md" className="mb-4">
              Categories
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Categories Populaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez nos differentes categories et trouvez ce qui vous correspond
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id || index}
                to={`/shop?category=${category.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src="/images/placeholder.svg"
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600 to-primary-800 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90 font-medium">{category.productCount || category.count || 'Produits'}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiArrowRight className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <Badge variant="primary" size="md" className="mb-3">
                Nouveautes
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Les Derniers Arrives
              </h2>
              <p className="text-gray-600 mt-2">Les derniers produits ajoutes</p>
            </div>
            <Link
              to="/shop?sort=newest"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center group"
            >
              Voir tout
              <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(newArrivals) && newArrivals.length > 0 ? (
              newArrivals.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-gray-400" />
                </div>
                Aucun nouveau produit pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <Badge variant="accent" size="md" className="mb-3">
                Selection
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Produits en Vedette
              </h2>
              <p className="text-gray-600 mt-2">Notre selection speciale pour vous</p>
            </div>
            <Link
              to="/shop"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center group"
            >
              Voir tout
              <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(featuredProducts) && featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-gray-400" />
                </div>
                Aucun produit en vedette pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" size="md" className="mb-6 bg-white/10 text-white border-white/20">
              Offre exclusive
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Pret a commencer votre shopping ?
            </h2>
            <p className="text-primary-100 mb-10 text-lg max-w-2xl mx-auto">
              Inscrivez-vous et obtenez <span className="font-bold text-white">10% de reduction</span> sur votre premiere commande
            </p>
            {!subscribed ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
                  setSubscribed(true)
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  aria-label="Email pour la newsletter"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-auto flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-gray-50 shadow-xl w-full sm:w-auto"
                  rightIcon={<FiArrowRight className="w-5 h-5" />}
                >
                  S'abonner
                </Button>
              </form>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-medium">Merci ! Vous etes abonne(e). Verifiez votre boite mail.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
