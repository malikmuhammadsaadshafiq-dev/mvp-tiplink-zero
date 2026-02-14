'use client'

import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  delay?: number
}

export function SkeletonCard({ delay = 0 }: SkeletonCardProps) {
  return (
    <div 
      className={cn(
        'bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6',
        'animate-pulse fade-in-up'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 shimmer" />
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-800 rounded shimmer" />
            <div className="w-32 h-3 bg-gray-800 rounded shimmer" />
          </div>
        </div>
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="w-20 h-8 bg-gray-800 rounded shimmer" />
        <div className="w-full h-4 bg-gray-800 rounded shimmer" />
        <div className="w-3/4 h-4 bg-gray-800 rounded shimmer" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
        <div className="flex items-center gap-2">
          <div className="w-16 h-5 bg-gray-800 rounded shimmer" />
          <div className="w-12 h-5 bg-gray-800 rounded shimmer" />
        </div>
        <div className="w-20 h-4 bg-gray-800 rounded shimmer" />
      </div>
    </div>
  )
}