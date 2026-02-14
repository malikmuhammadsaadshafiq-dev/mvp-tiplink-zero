'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  darkMode?: boolean
}

export function Skeleton({ darkMode }: SkeletonProps) {
  return (
    <div className="space-y-8 animate-pulse">
      <div className={cn("h-12 rounded w-1/3 mb-8", darkMode ? "bg-neutral-800" : "bg-gray-200")}></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className={cn("h-32 rounded border-b-2", darkMode ? "bg-neutral-800 border-neutral-700" : "bg-gray-200 border-gray-300")}></div>
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className={cn("h-48 rounded border-b-2", darkMode ? "bg-neutral-800 border-neutral-700" : "bg-gray-200 border-gray-300")}></div>
        ))}
      </div>
    </div>
  )
}