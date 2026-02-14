'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={cn(
      "fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 slide-in-bottom z-50",
      type === 'success' ? "bg-green-900 text-white" : "bg-red-900 text-white"
    )}>
      <div className="flex items-center gap-3">
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  )
}