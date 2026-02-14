'use client'

import { useState, useEffect, useMemo } from 'react'
import { Navbar } from '@/components/Navbar'
import { TipCard } from '@/components/TipCard'
import { StatsCard } from '@/components/StatsCard'
import { EmptyState } from '@/components/EmptyState'
import { Toast } from '@/components/Toast'
import { Skeleton } from '@/components/Skeleton'
import { cn } from '@/lib/utils'

interface Tip {
  id: string
  creatorName: string
  amount: number
  message: string
  date: string
  status: 'completed' | 'pending'
  walletAddress: string
  badge: 'Gold' | 'Silver' | 'Bronze' | 'Verified'
  avatar: string
}

const initialTips: Tip[] = [
  {
    id: '1',
    creatorName: 'Sarah Chen',
    amount: 50.00,
    message: 'Your tutorial on Solana program development completely changed how I approach smart contract architecture. The zero-copy serialization explanation was particularly brilliant.',
    date: '2024-03-15',
    status: 'completed',
    walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    badge: 'Gold',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen'
  },
  {
    id: '2',
    creatorName: 'Alex Rivera',
    amount: 125.50,
    message: 'The DeFi risk analysis you published last week saved my portfolio during the market volatility. This is a small token of appreciation for your consistent high-quality research.',
    date: '2024-03-14',
    status: 'completed',
    walletAddress: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
    badge: 'Verified',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera'
  },
  {
    id: '3',
    creatorName: 'Marcus Johnson',
    amount: 25.00,
    message: 'Thanks for the wallet security masterclass. Implemented your multi-sig recommendation immediately and feel much safer now.',
    date: '2024-03-13',
    status: 'pending',
    walletAddress: '9ZNTfG4Z2XvSfHg8xPzqPpPpPpPpPpPpPpPpP',
    badge: 'Silver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusJohnson'
  },
  {
    id: '4',
    creatorName: 'Emily Zhang',
    amount: 75.00,
    message: 'The NFT metadata standards guide you wrote cleared up months of confusion. Finally understand how to properly structure on-chain attributes.',
    date: '2024-03-12',
    status: 'completed',
    walletAddress: '5KfP5yW5yW5yW5yW5yW5yW5yW5yW5yW5yW5yW',
    badge: 'Gold',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyZhang'
  },
  {
    id: '5',
    creatorName: 'David Kim',
    amount: 10.00,
    message: 'Quick coffee for your daily market updates. Keep them coming!',
    date: '2024-03-11',
    status: 'completed',
    walletAddress: '8JdQ2fQ2fQ2fQ2fQ2fQ2fQ2fQ2fQ2fQ2fQ2f',
    badge: 'Bronze',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim'
  },
  {
    id: '6',
    creatorName: 'Lisa Park',
    amount: 200.00,
    message: 'Your investment thesis on liquid staking derivatives paid off big time. Sharing 10% of my profits as promised. You are a true visionary in this space.',
    date: '2024-03-10',
    status: 'completed',
    walletAddress: '2RtLgRtLgRtLgRtLgRtLgRtLgRtLgRtLgRtLg',
    badge: 'Verified',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LisaPark'
  },
  {
    id: '7',
    creatorName: 'James Wilson',
    amount: 15.00,
    message: 'Love the daily technical analysis threads. The support/resistance levels you identified yesterday were spot on.',
    date: '2024-03-09',
    status: 'pending',
    walletAddress: '6MxKxMxKxMxKxMxKxMxKxMxKxMxKxMxKxMxK',
    badge: 'Silver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamesWilson'
  },
  {
    id: '8',
    creatorName: 'Anna Kowalski',
    amount: 45.00,
    message: 'Your Rust programming tutorials are absolute gold. Finally understand ownership and borrowing after years of confusion.',
    date: '2024-03-08',
    status: 'completed',
    walletAddress: '4NpQNpQNpQNpQNpQNpQNpQNpQNpQNpQNpQNpQ',
    badge: 'Gold',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnnaKowalski'
  },
  {
    id: '9',
    creatorName: 'Tom Bradley',
    amount: 5.00,
    message: 'Small tip for the big value you provide to the community every single day.',
    date: '2024-03-07',
    status: 'completed',
    walletAddress: '1HzHzHzHzHzHzHzHzHzHzHzHzHzHzHzHzHzHz',
    badge: 'Bronze',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TomBradley'
  },
  {
    id: '10',
    creatorName: 'Rachel Green',
    amount: 150.00,
    message: 'Consulting fee for the architecture advice you gave me last week. The zero-knowledge proof implementation you suggested reduced our gas costs by 80%.',
    date: '2024-03-06',
    status: 'completed',
    walletAddress: '3QwertyQwertyQwertyQwertyQwertyQwertyQ',
    badge: 'Verified',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RachelGreen'
  },
  {
    id: '11',
    creatorName: 'Michael Chang',
    amount: 30.00,
    message: 'Appreciate the transparency in your tokenomics breakdowns. More creators should be this honest with their communities.',
    date: '2024-03-05',
    status: 'pending',
    walletAddress: '9AsdfAsdfAsdfAsdfAsdfAsdfAsdfAsdfAsdf',
    badge: 'Silver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChang'
  },
  {
    id: '12',
    creatorName: 'Sophie Martinez',
    amount: 85.00,
    message: 'Best crypto educator on the platform, bar none. Your explanation of MEV protection strategies was masterful.',
    date: '2024-03-04',
    status: 'completed',
    walletAddress: '7ZxcvZxcvZxcvZxcvZxcvZxcvZxcvZxcvZxcv',
    badge: 'Gold',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SophieMartinez'
  }
]

export default function Home() {
  const [items, setItems] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'profile'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date')
  const [darkMode, setDarkMode] = useState(false)
  const [userName, setUserName] = useState('Creator Pro')
  
  const [formData, setFormData] = useState({
    creatorName: '',
    amount: '',
    message: '',
    walletAddress: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const savedItems = localStorage.getItem('tiplink_items')
    const savedUser = localStorage.getItem('tiplink_user')
    const savedDark = localStorage.getItem('tiplink_dark')
    
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      setItems(initialTips)
    }
    
    if (savedUser) setUserName(savedUser)
    if (savedDark) setDarkMode(JSON.parse(savedDark))
    
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('tiplink_items', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('tiplink_user', userName)
  }, [userName])

  useEffect(() => {
    localStorage.setItem('tiplink_dark', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [items, searchQuery])

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems]
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 'amount':
        return sorted.sort((a, b) => b.amount - a.amount)
      case 'name':
        return sorted.sort((a, b) => a.creatorName.localeCompare(b.creatorName))
      default:
        return sorted
    }
  }, [filteredItems, sortBy])

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
    setToast({ message: 'Tip removed successfully', type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.creatorName.trim()) errors.creatorName = 'Creator name is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Valid amount required'
    if (!formData.walletAddress.trim() || formData.walletAddress.length < 32) {
      errors.walletAddress = 'Valid Solana wallet address required'
    }
    if (formData.message.length < 5) errors.message = 'Message must be at least 5 characters'
    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      const newTip: Tip = {
        id: Math.random().toString(36).substr(2, 9),
        creatorName: formData.creatorName,
        amount: parseFloat(formData.amount),
        message: formData.message,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        walletAddress: formData.walletAddress,
        badge: 'Verified',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.creatorName}`
      }
      
      setItems(prev => [newTip, ...prev])
      setFormData({ creatorName: '', amount: '', message: '', walletAddress: '' })
      setFormErrors({})
      setShowForm(false)
      setToast({ message: 'Tip sent successfully!', type: 'success' })
      setIsSubmitting(false)
      setTimeout(() => setToast(null), 3000)
    }, 1000)
  }

  const handleExport = () => {
    const data = JSON.stringify(items, null, 2)
    navigator.clipboard.writeText(data)
    setToast({ message: 'Data copied to clipboard', type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  const stats = useMemo(() => {
    const totalVolume = items.reduce((sum, item) => sum + item.amount, 0)
    const completedTips = items.filter(i => i.status === 'completed').length
    const completionRate = items.length > 0 ? Math.round((completedTips / items.length) * 100) : 0
    const avgTip = items.length > 0 ? (totalVolume / items.length).toFixed(2) : '0.00'
    return { totalVolume: totalVolume.toFixed(2), count: items.length, completionRate, avgTip }
  }, [items])

  const recentActivity = items.slice(0, 5)

  return (
    <div className={cn("min-h-screen transition-colors duration-300", darkMode ? "bg-neutral-950" : "bg-white")}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <Skeleton darkMode={darkMode} />
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="space-y-8 fade-in-up">
                <div className="editorial mb-8">
                  <h1 className={cn("font-black mb-4", darkMode ? "text-white" : "text-black")}>
                    Support Creators
                  </h1>
                  <p className={cn("text-xl max-w-2xl", darkMode ? "text-neutral-400" : "text-gray-600")}>
                    Zero-fee USDC tipping with instant settlement. Build on-chain reputation with every contribution.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                      Search creators
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., Sarah Chen or wallet address"
                      className={cn(
                        "w-full px-4 py-3 border-2 rounded-none focus:outline-none focus:ring-2 focus:ring-black transition-all",
                        darkMode 
                          ? "bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500" 
                          : "bg-white border-gray-200"
                      )}
                    />
                  </div>
                  <div className="sm:w-48">
                    <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                      Sort by
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'name')}
                      className={cn(
                        "w-full px-4 py-3 border-2 rounded-none focus:outline-none focus:ring-2 focus:ring-black transition-all",
                        darkMode 
                          ? "bg-neutral-900 border-neutral-700 text-white" 
                          : "bg-white border-gray-200"
                      )}
                    >
                      <option value="date">Most Recent</option>
                      <option value="amount">Highest Amount</option>
                      <option value="name">Creator Name</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h2 className={cn("text-2xl font-bold", darkMode ? "text-white" : "text-black")}>
                    {filteredItems.length} Tips
                  </h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className={cn(
                      "font-medium px-6 py-2 transition-all duration-200 active:scale-95",
                      darkMode 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : "bg-black text-white hover:bg-gray-800"
                    )}
                  >
                    {showForm ? 'Cancel' : 'Send Tip'}
                  </button>
                </div>

                {showForm && (
                  <form 
                    onSubmit={handleSubmit}
                    className={cn(
                      "border-2 p-6 mb-8 fade-in-up",
                      darkMode ? "bg-neutral-900 border-white" : "bg-white border-black"
                    )}
                  >
                    <h3 className="text-xl font-bold mb-4">Send New Tip</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                          Creator Name
                        </label>
                        <input
                          type="text"
                          value={formData.creatorName}
                          onChange={(e) => setFormData({...formData, creatorName: e.target.value})}
                          placeholder="e.g., Sarah Chen"
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-none focus:outline-none transition-all",
                            formErrors.creatorName 
                              ? "border-red-500" 
                              : darkMode ? "border-neutral-700 bg-neutral-800" : "border-gray-200"
                          )}
                        />
                        {formErrors.creatorName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.creatorName}</p>
                        )}
                      </div>
                      <div>
                        <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                          Amount (USDC)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.amount}
                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                          placeholder="e.g., 50.00"
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-none focus:outline-none transition-all",
                            formErrors.amount 
                              ? "border-red-500" 
                              : darkMode ? "border-neutral-700 bg-neutral-800" : "border-gray-200"
                          )}
                        />
                        {formErrors.amount && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                          Wallet Address
                        </label>
                        <input
                          type="text"
                          value={formData.walletAddress}
                          onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
                          placeholder="e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-none focus:outline-none transition-all font-mono text-sm",
                            formErrors.walletAddress 
                              ? "border-red-500" 
                              : darkMode ? "border-neutral-700 bg-neutral-800" : "border-gray-200"
                          )}
                        />
                        {formErrors.walletAddress && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.walletAddress}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="e.g., Thank you for the amazing content..."
                          rows={3}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-none focus:outline-none transition-all resize-none",
                            formErrors.message 
                              ? "border-red-500" 
                              : darkMode ? "border-neutral-700 bg-neutral-800" : "border-gray-200"
                          )}
                        />
                        {formErrors.message && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "font-medium px-8 py-3 transition-all duration-200 active:scale-95 disabled:opacity-50",
                          darkMode 
                            ? "bg-white text-black hover:bg-gray-200" 
                            : "bg-black text-white hover:bg-gray-800"
                        )}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Tip'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className={cn(
                          "font-medium px-8 py-3 border-2 transition-all duration-200 active:scale-95",
                          darkMode 
                            ? "border-white text-white hover:bg-white hover:text-black" 
                            : "border-black text-black hover:bg-black hover:text-white"
                        )}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {sortedItems.length === 0 ? (
                  <EmptyState onAction={() => setShowForm(true)} darkMode={darkMode} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedItems.map((tip, index) => (
                      <TipCard 
                        key={tip.id} 
                        tip={tip} 
                        onDelete={handleDelete}
                        index={index}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8 fade-in-up">
                <h2 className={cn("text-3xl font-bold mb-6", darkMode ? "text-white" : "text-black")}>Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard 
                    title="Total Volume" 
                    value={`$${stats.totalVolume}`} 
                    trend="+12% this month"
                    delay={0}
                    darkMode={darkMode}
                  />
                  <StatsCard 
                    title="Total Tips" 
                    value={stats.count} 
                    delay={0.1}
                    darkMode={darkMode}
                  />
                  <StatsCard 
                    title="Completion Rate" 
                    value={`${stats.completionRate}%`} 
                    trend="On track"
                    delay={0.2}
                    darkMode={darkMode}
                  />
                  <StatsCard 
                    title="Average Tip" 
                    value={`$${stats.avgTip}`} 
                    delay={0.3}
                    darkMode={darkMode}
                  />
                </div>

                <div className={cn(
                  "border-2 p-6",
                  darkMode ? "bg-neutral-900 border-white" : "bg-white border-black"
                )}>
                  <h3 className="text-xl font-bold mb-4">Status Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={darkMode ? "text-neutral-300" : "text-gray-700"}>Completed</span>
                        <span className="font-bold">{items.filter(i => i.status === 'completed').length}</span>
                      </div>
                      <div className={cn("h-2 w-full", darkMode ? "bg-neutral-800" : "bg-gray-200")}>
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${items.length ? (items.filter(i => i.status === 'completed').length / items.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={darkMode ? "text-neutral-300" : "text-gray-700"}>Pending</span>
                        <span className="font-bold">{items.filter(i => i.status === 'pending').length}</span>
                      </div>
                      <div className={cn("h-2 w-full", darkMode ? "bg-neutral-800" : "bg-gray-200")}>
                        <div 
                          className="h-full bg-yellow-500 transition-all duration-500"
                          style={{ width: `${items.length ? (items.filter(i => i.status === 'pending').length / items.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cn(
                  "border-2 p-6",
                  darkMode ? "bg-neutral-900 border-white" : "bg-white border-black"
                )}>
                  <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "flex items-center justify-between py-3 border-b last:border-0",
                          darkMode ? "border-neutral-800" : "border-gray-100"
                        )}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            item.status === 'completed' ? "bg-green-500" : "bg-yellow-500"
                          )} />
                          <span className="font-medium">{item.creatorName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={darkMode ? "text-neutral-400" : "text-gray-500"}>{item.date}</span>
                          <span className="font-bold">${item.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-2xl fade-in-up">
                <h2 className={cn("text-3xl font-bold mb-6", darkMode ? "text-white" : "text-black")}>Settings</h2>
                
                <div className={cn(
                  "border-2 p-6 mb-6",
                  darkMode ? "bg-neutral-900 border-white" : "bg-white border-black"
                )}>
                  <h3 className="text-xl font-bold mb-4">Profile</h3>
                  <div className="mb-6">
                    <label className={cn("block text-sm font-medium mb-2", darkMode ? "text-neutral-300" : "text-gray-700")}>
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 border-2 rounded-none focus:outline-none focus:ring-2 focus:ring-black transition-all",
                        darkMode ? "bg-neutral-800 border-neutral-700 text-white" : "bg-white border-gray-200"
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-neutral-800">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className={cn("text-sm", darkMode ? "text-neutral-400" : "text-gray-500")}>Toggle dark theme</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={cn(
                        "w-14 h-8 rounded-full transition-colors relative",
                        darkMode ? "bg-white" : "bg-black"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-6 h-6 rounded-full transition-transform",
                        darkMode ? "bg-black translate-x-7" : "bg-white translate-x-1"
                      )} />
                    </button>
                  </div>
                </div>

                <div className={cn(
                  "border-2 p-6",
                  darkMode ? "bg-neutral-900 border-white" : "bg-white border-black"
                )}>
                  <h3 className="text-xl font-bold mb-4">Data</h3>
                  <p className={cn("mb-4", darkMode ? "text-neutral-400" : "text-gray-600")}>
                    Export all your tipping data as JSON. This includes all transaction history, creator information, and reputation badges.
                  </p>
                  <button
                    onClick={handleExport}
                    className={cn(
                      "font-medium px-8 py-3 transition-all duration-200 active:scale-95",
                      darkMode 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : "bg-black text-white hover:bg-gray-800"
                    )}
                  >
                    Export Data
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}