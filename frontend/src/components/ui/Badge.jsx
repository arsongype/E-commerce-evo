import { twMerge } from 'tailwind-merge'

export default function Badge({ children, variant = 'default', size = 'sm', className = '', dot }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300',
    success: 'bg-success-50 text-success-700 dark:bg-success-900/50 dark:text-success-300',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-900/50 dark:text-warning-300',
    danger: 'bg-danger-50 text-danger-700 dark:bg-danger-900/50 dark:text-danger-300',
    info: 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300',
  }

  const sizes = {
    xs: 'px-2 py-0.5 text-xs gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  }

  return (
    <span className={twMerge(
      'inline-flex items-center font-semibold rounded-full',
      variants[variant],
      sizes[size],
      className
    )}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      )}
      {children}
    </span>
  )
}
