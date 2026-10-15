import { useState } from 'react'
import { FiSave, FiBell, FiShield, FiGlobe } from 'react-icons/fi' // removed unused FiMail
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'ShopEase',
    siteEmail: 'contact@shopease.fr',
    currency: 'EUR',
    language: 'fr',
    notifications: true,
    maintenance: false,
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Parametres sauvegardes avec succes')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Parametres</h1>
        <p className="text-gray-600 mt-1">Configurez votre boutique</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <FiGlobe className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">General</h2>
              <p className="text-sm text-gray-500">Informations de base du site</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nom du site"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
            <Input
              label="Email de contact"
              type="email"
              value={settings.siteEmail}
              onChange={(e) => handleChange('siteEmail', e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              >
                <option value="fr">Francais</option>
                <option value="en">Anglais</option>
                <option value="mg">Malgache</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <FiBell className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500">Gerez vos preferences de notification</p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Notifications par email</p>
                <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Mode maintenance</p>
                <p className="text-sm text-gray-500">Activer le mode maintenance</p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenance}
                onChange={(e) => handleChange('maintenance', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <FiShield className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Securite</h2>
              <p className="text-sm text-gray-500">Parametres de securite du compte</p>
            </div>
          </div>
          <div className="space-y-4">
            <Input
              label="Mot de passe actuel"
              type="password"
              placeholder="••••••••"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nouveau mot de passe"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="Confirmer le mot de passe"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary">Annuler</Button>
          <Button type="submit" leftIcon={<FiSave className="w-4 h-4" />}>Sauvegarder</Button>
        </div>
      </form>
    </div>
  )
}
