'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Tip {
  id: string
  creatorName: string
  amount: number
  message: string
  date: string
  status: 'completed' | 'pending'
  walletAddress: string
  badge: string
  avatar: string
}

interface TipCardProps {
  tip: Tip
  onDelete: (id: string) => void
  index: number
  darkMode: boolean
}

export function TipCard({ tip, onDelete, index, darkMode }: TipCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => onDelete(tip.id), 300)
  }

  const badgeColors = {
    Gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Silver: "bg-gray-100 text-gray-800 border-gray-200",
    Bronze: "bg-orange-100 text-orange-800 border-orange-200",
    Verified: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return (
    <div 
      className={cn(
        "group border-b-2 pb-6 p-6 transition-all duration-300 fade-in-up",
        isDeleting ? "opacity-0 -translate-x-full" : "opacity-100",
        darkMode 
          ? "bg-neutral-900 border-white hover:bg-neutral-800" 
          : "bg-white border-black hover:shadow-xl hover:-translate-y-1"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={tip.avatar} 
            alt={tip.creatorName} 
            className={cn(
              "w-12 h-12 rounded-full object-cover",
              darkMode ? "bg-neutral-700" : "bg-gray-100"
            )}
          />
          <div>
            <h3 className="font-bold text-lg leading-tight">{tip.creatorName}</h3>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium border",
              badgeColors[tip.badge as keyof typeof badgeColors] || badgeColors.Verified
            )}>
              {tip.badge}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${tip.amount.toFixed(2)}</div>
          <div className={cn("text-sm", darkMode ? "text-neutral-400" : "text-gray-500")}>USDC</div>
        </div>
      </div>
      
      <p className={cn("mb-4 line-clamp-3", darkMode ? "text-neutral-300" : "text-gray-700")}>
        {tip.message}
      </p>
      
      <div className="flex items-center justify-between text-sm mb-4">
        <span className={darkMode ? "text-neutral-400" : "text-gray-500"}>{tip.date}</span>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          tip.status === 'completed' 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        )}>
          {tip.status}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <code className={cn(
          "text-xs px-2 py-1 rounded font-mono",
          darkMode ? "bg-neutral-800 text-neutral-300" : "bg-gray-100 text-gray-700"
        )}>
          {tip.walletAddress.slice(0, 6)}...{tip.walletAddress.slice(-4)}
        </code>
        <button 
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors active:scale-95"
        >
          Remove
        </button>
      </div>
    </div>
  )
}