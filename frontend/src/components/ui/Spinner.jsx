import { twMerge } from 'tailwind-merge'

export default function Spinner({ size = 'md', color = 'primary', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const colors = {
    primary: 'border-primary-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-600 border-t-transparent',
    success: 'border-success-500 border-t-transparent',
  }

  return (
    <div className={twMerge('flex items-center justify-center', className)}>
      <div className={`${sizes[size]} border-2 rounded-full animate-spin ${colors[color] || colors.primary}`} />
    </div>
  )
}