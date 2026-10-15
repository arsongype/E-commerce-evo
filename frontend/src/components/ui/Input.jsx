import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

export default function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        )}
        <input
          className={twMerge(
            'w-full px-4 py-3 border rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:shadow-lg focus:shadow-primary-500/10',
            Icon && 'pl-11',
            error
              ? 'border-danger-500 bg-danger-50 dark:bg-danger-950/30 focus:ring-danger-500'
              : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-surface-800 hover:border-gray-300 dark:hover:border-gray-600',
            props.disabled && 'bg-gray-50 dark:bg-surface-900 text-gray-500 dark:text-gray-400 cursor-not-allowed',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-danger-600 dark:text-danger-400 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  )
}
