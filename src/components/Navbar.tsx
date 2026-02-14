'use client'

import { cn } from '@/lib/utils'

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'profile'
  setActiveTab: (tab: 'home' | 'dashboard' | 'profile') => void
  darkMode: boolean
}

export function Navbar({ activeTab, setActiveTab, darkMode }: NavbarProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'dashboard' as const, label: 'Dashboard' },
    { id: 'profile' as const, label: 'Settings' },
  ]

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b-2 transition-colors duration-300",
      darkMode ? "bg-neutral-950 border-white" : "bg-white border-black"
    )}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors",
            darkMode ? "bg-white text-black" : "bg-black text-white"
          )}>
            T
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">TipLink Zero</h1>
            <p className="text-xs opacity-60 hidden sm:block">Zero-fee USDC settlement</p>
          </div>
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 sm:px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm sm:text-base",
                activeTab === tab.id 
                  ? (darkMode ? "bg-white text-black" : "bg-black text-white") 
                  : (darkMode ? "hover:bg-neutral-800 text-white" : "hover:bg-gray-100 text-black")
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}