'use client'

import { cn } from '@/lib/utils'

interface EmptyStateProps {
  onAction: () => void
  darkMode: boolean
}

export function EmptyState({ onAction, darkMode }: EmptyStateProps) {
  return (
    <div className="text-center py-16 fade-in-up">
      <div className={cn(
        "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center",
        darkMode ? "bg-neutral-800" : "bg-gray-100"
      )}>
        <svg className={cn("w-12 h-12", darkMode ? "text-neutral-400" : "text-gray-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2">No tips yet</h3>
      <p className={cn("mb-6 max-w-md mx-auto", darkMode ? "text-neutral-400" : "text-gray-500")}>
        Start supporting your favorite creators with zero-fee USDC transfers. Every tip helps build the on-chain reputation economy.
      </p>
      <button 
        onClick={onAction}
        className={cn(
          "font-medium px-8 py-3 transition-all duration-200 active:scale-95",
          darkMode 
            ? "bg-white text-black hover:bg-gray-200" 
            : "bg-black text-white hover:bg-gray-800"
        )}
      >
        Send your first tip
      </button>
    </div>
  )
}