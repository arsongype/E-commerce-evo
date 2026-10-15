import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(0)
      let start = Math.max(1, currentPage - 1)
      let end = Math.min(totalPages - 2, currentPage + 1)
      
      if (currentPage <= 2) end = 3
      if (currentPage >= totalPages - 3) start = totalPages - 4
      
      if (start > 1) pages.push('...')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 2) pages.push('...')
      pages.push(totalPages - 1)
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`min-w-[2.5rem] h-10 rounded-xl font-semibold transition-all duration-200 ${
            page === currentPage
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
              : page === '...'
              ? 'cursor-default text-gray-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {typeof page === 'number' ? page + 1 : page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}