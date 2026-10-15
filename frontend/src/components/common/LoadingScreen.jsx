import Spinner from '../ui/Spinner'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-primary-50/30 to-gray-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-900">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl mb-8 shadow-xl shadow-primary-500/30 animate-pulse">
          <span className="text-3xl font-bold text-white">S</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Shop<span className="text-primary-600 dark:text-primary-400">Ease</span>
        </h2>
        <Spinner size="lg" color="primary" />
        <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium">Chargement en cours...</p>
      </div>
    </div>
  )
}
