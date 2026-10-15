import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiArrowRight } from 'react-icons/fi'
import Button from '../ui/Button'
import Input from '../ui/Input'

const footerLinks = {
  shop: {
    title: 'Boutique',
    links: [
      { label: 'Nouveautes', to: '/shop?sort=newest' },
      { label: 'Promotions', to: '/shop?sort=price_desc' },
      { label: 'Meilleures ventes', to: '/shop' },
      { label: 'Toutes les categories', to: '/shop' },
    ],
  },
  help: {
    title: 'Aide',
    links: [
      { label: 'Service client', to: '/contact' },
      { label: 'Livraison', to: '/contact' },
      { label: 'Retours', to: '/contact' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
  about: {
    title: 'A propos',
    links: [
      { label: 'Notre histoire', to: '/about' },
      { label: 'Carrieres', to: '/about' },
      { label: 'Blog', to: '/about' },
      { label: 'Presse', to: '/about' },
    ],
  },
}

const socialLinks = [
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-gradient-to-b from-surface-900 to-surface-950 text-gray-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-800/60">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/10 rounded-2xl mb-6">
              <FiMail className="w-6 h-6 text-primary-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Restez informe
            </h2>
            <p className="text-gray-400 mb-8">
              Inscrivez-vous a notre newsletter pour recevoir nos meilleures offres et nouveautes.
            </p>
            {!subscribed ? (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={FiMail}
                  className="flex-1 !bg-gray-800/50 !border-gray-700 !text-white placeholder-gray-500"
                />
                <Button type="submit" variant="primary" rightIcon={<FiArrowRight className="w-4 h-4" />}>
                  S'abonner
                </Button>
              </form>
            ) : (
              <div className="bg-success-500/10 border border-success-500/30 rounded-2xl px-6 py-4 inline-flex items-center gap-3">
                <div className="w-8 h-8 bg-success-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-success-400 font-medium">Merci ! Vous etes abonne(e).</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand & Contact */}
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="inline-block mb-6 group">
                <h2 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                  Shop<span className="text-primary-400">Ease</span>
                </h2>
              </Link>
              <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
                Votre destination shopping en ligne avec des milliers de produits selectionnes pour vous.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-sm">123 Avenue du Commerce, 75001 Paris</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-sm">contact@shopease.fr</span>
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/60 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-500">
              © 2026 ShopEase. Tous droits reserves.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800/50 hover:bg-primary-600 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer