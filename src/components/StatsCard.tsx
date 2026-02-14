'use client'

import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  trend?: string
  delay?: number
  darkMode: boolean
}

export function StatsCard({ title, value, trend, delay = 0, darkMode }: StatsCardProps) {
  return (
    <div 
      className={cn(
        "border-b-2 pb-6 p-6 fade-in-up transition-all duration-300 hover:-translate-y-1",
        darkMode 
          ? "bg-neutral-900 border-white" 
          : "bg-white border-black hover:shadow-lg"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <h3 className={cn(
        "text-sm font-medium uppercase tracking-wider mb-2",
        darkMode ? "text-neutral-400" : "text-gray-500"
      )}>
        {title}
      </h3>
      <div className="text-4xl font-bold mb-1">{value}</div>
      {trend && <div className="text-sm text-green-600 font-medium">{trend}</div>}
    </div>
  )
}