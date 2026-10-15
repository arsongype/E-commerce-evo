import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

// Layout Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/common/LoadingScreen'
import ErrorBoundary from './components/common/ErrorBoundary'
import Button from './components/ui/Button'
import Badge from './components/ui/Badge'
import { FiHome, FiShoppingBag, FiUsers, FiPackage, FiBarChart2, FiSettings } from 'react-icons/fi'

// Pages publiques
import HomePage from './pages/public/HomePage'
import ShopPage from './pages/public/ShopPage'
import ProductPage from './pages/public/ProductPage'
import CartPage from './pages/public/CartPage'

// Pages authentification
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Pages utilisateur
import ProfilePage from './pages/user/ProfilePage'
import OrdersPage from './pages/user/OrdersPage'
import OrderDetailPage from './pages/user/OrderDetailPage'

// Page checkout
import CheckoutPage from './pages/checkout/CheckoutPage'

// Page admin
import DashboardPage from './pages/admin/DashboardPage'
import ProductsPage from './pages/admin/ProductsPage'
import AdminOrdersPage from './pages/admin/OrdersPage'
import UsersPage from './pages/admin/UsersPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import SettingsPage from './pages/admin/SettingsPage'

// Composant pour les routes protegees
function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}

// Layout principal
function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 w-full px-4 py-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--header-h)' }}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

// Layout admin
function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-surface-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-64 bg-gradient-to-b from-surface-900 to-surface-950 text-white min-h-screen p-6 flex flex-col">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white">
              Shop<span className="text-primary-400">Ease</span>
            </span>
          </Link>
          
          <nav className="space-y-1 flex-1">
            <Link to="/admin" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group">
              <FiBarChart2 className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Tableau de bord</span>
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group">
              <FiPackage className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Produits</span>
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group">
              <FiShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Commandes</span>
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group">
              <FiUsers className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Utilisateurs</span>
            </Link>
            <Link to="/admin/categories" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group">
              <FiPackage className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Categories</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group">
              <FiSettings className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Parametres</span>
            </Link>
          </nav>

          <div className="pt-6 border-t border-white/10">
            <Link
              to="/"
              className="flex items-center gap-2 py-3 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group"
            >
              <FiHome className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              <span className="font-medium">Retour au site</span>
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-surface-900 min-h-screen">
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

// Page 404
function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page non trouvee</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          La page que vous recherchez n'existe pas ou a ete deplacee.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" leftIcon={<FiHome className="w-4 h-4" />}>
              Retour a l'accueil
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary">
              Voir la boutique
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

// Page d'erreur
function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-danger-100 to-danger-200 dark:from-danger-900/50 dark:to-danger-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold text-danger-600 dark:text-danger-400">500</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Erreur serveur</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Une erreur est survenue. Veuillez reessayer plus tard.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
        >
          Rafraichir la page
        </Button>
      </motion.div>
    </div>
  )
}

// Page mentions legales
function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mentions legales</h1>
      <div className="prose dark:prose-invert max-w-none bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 border border-gray-100 dark:border-gray-700">
        <h2>1. Informations legales</h2>
        <p>ShopEase SAS - Capital social : 10 000€</p>
        <p>RCS Madagascar : 0374541581</p>
        <p>Siege social : Andranomadio Toamasina </p>

        <h2>2. Hebergement</h2>
        <p>Ce site est heberge par :</p>
        <p>VPS Hosting sécurisé</p>

        <h2>3. Propriete intellectuelle</h2>
        <p>Tous les contenus de ce site sont proteges par le droit d'auteur.</p>
      </div>
    </div>
  )
}

// Page CGV
function CGVPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Conditions Generales de Vente</h1>
      <div className="prose dark:prose-invert max-w-none bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 border border-gray-100 dark:border-gray-700">
        <h2>Article 1 : Objet</h2>
        <p>Les presentes conditions regissent les ventes par la societe ShopEase.</p>

        <h2>Article 2 : Prix</h2>
        <p>Les prix sont indiques en euros toutes taxes comprises.</p>

        <h2>Article 3 : Commandes</h2>
        <p>Toute commande vaut acceptation des prix et descriptions des produits.</p>

        <h2>Article 4 : Livraison</h2>
        <p>La livraison est effectuee dans un delai de 3 a 5 jours ouvres.</p>

        <h2>Article 5 : Retractation</h2>
        <p>Le client dispose d'un delai de 14 jours pour exercer son droit de retractation.</p>
      </div>
    </div>
  )
}

// Page contact
function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Badge variant="primary" size="md" className="mb-4">Contact</Badge>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contactez-nous</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Une question ? N'hesitez pas a nous contacter, notre equipe est a votre disposition.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nos coordonnees</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-surface-700 rounded-2xl">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center shrink-0">
                <FiHome className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">123 Avenue du Commerce, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-surface-700 rounded-2xl">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center shrink-0">
                <FiShoppingBag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-surface-700 rounded-2xl">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center shrink-0">
                <FiUsers className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">contact@shopease.fr</span>
            </div>
          </div>
        </div>
        <form className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 border border-gray-100 dark:border-gray-700 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nom</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea rows="5" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-700 text-gray-900 dark:text-white resize-none"></textarea>
          </div>
          <Button variant="primary" size="lg" fullWidth>
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  )
}

// Page A propos
function AboutPage() {
  const team = [
    { name: 'Marie Laurent', role: 'CEO & Fondatrice' },
    { name: 'Thomas Bernard', role: 'CTO' },
    { name: 'Sophie Martin', role: 'Directrice Marketing' },
    { name: 'Lucas Petit', role: 'Responsable Produit' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <Badge variant="primary" size="md" className="mb-4">A propos</Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          A propos de ShopEase
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          ShopEase est nee en 2024 avec une mission simple : rendre le shopping en ligne accessible, agreable et securise pour tous.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 text-center border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/25">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Notre Mission</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Offrir la meilleure experience de shopping en ligne
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 text-center border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent-500/25">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Notre Vision</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Devenir la reference e-commerce en Europe
          </p>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-8 text-center border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-success-500/25">
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Nos Valeurs</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Qualite, confiance et satisfaction client
          </p>
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Notre Equipe</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Les personnes qui font la difference</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <div key={index} className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-700 dark:text-primary-300 group-hover:scale-110 transition-transform duration-300">
              {member.name.charAt(0)}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Composant App principal
function App() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
        {/* Routes avec layout principal */}
        <Route element={<MainLayout />}>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Routes d'authentification */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes protegees utilisateur */}
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute><OrdersPage /></ProtectedRoute>
          } />
          <Route path="/orders/:id" element={
            <ProtectedRoute><OrderDetailPage /></ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute><CheckoutPage /></ProtectedRoute>
          } />

          {/* Pages d'information */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/cgv" element={<CGVPage />} />

          {/* Pages d'erreur */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Routes admin avec layout separe */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
  )
}

export default App