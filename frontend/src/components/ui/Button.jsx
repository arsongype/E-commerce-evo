import { twMerge } from 'tailwind-merge'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  loading = false,
  fullWidth = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) {
  const busy = isLoading || loading

  const baseStyle =
    'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 shadow-sm hover:shadow-md',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    success: 'bg-success-600 text-white hover:bg-success-700 shadow-sm hover:shadow-md',
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-xs gap-1.5',
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-8 py-4 text-lg gap-3',
  }

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }

  return (
    <button
      className={twMerge(
        baseStyle,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || busy}
      {...props}
    >
      {busy ? (
        <>
          <svg
            className="animate-spin -ml-0.5 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Chargement...
        </>
      ) : (
        <>
          {leftIcon && <span className={iconSizes[size] || iconSizes.md}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={iconSizes[size] || iconSizes.md}>{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
