'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { cn, generateId } from '@/lib/utils'
import type { Tip } from './TipCard'

interface CreateTipModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (tip: Tip) => void
}

export function CreateTipModal({ isOpen, onClose, onSubmit }: CreateTipModalProps) {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    message: '',
    walletAddress: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient name is required'
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required'
    }
    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = 'Wallet address is required'
    } else if (formData.walletAddress.length < 32) {
      newErrors.walletAddress = 'Invalid Solana wallet address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 5) {
      newErrors.message = 'Message must be at least 5 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newTip: Tip = {
      id: generateId(),
      sender: 'You',
      recipient: formData.recipient,
      amount: parseFloat(formData.amount),
      message: formData.message,
      date: new Date().toISOString(),
      status: 'completed',
      walletAddress: formData.walletAddress,
      reputationBadge: 'Verified',
      txHash: '0x' + Math.random().toString(16).substr(2, 40),
    }
    
    onSubmit(newTip)
    setFormData({ recipient: '', amount: '', message: '', walletAddress: '' })
    setIsSubmitting(false)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gray-900 border border-cyan-500/50 rounded-lg shadow-neon">
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-cyan-50">Send Tip</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-cyan-500/10 text-cyan-50/70 hover:text-cyan-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-cyan-50 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="e.g., Sarah Chen"
              className={cn(
                'w-full px-4 py-2 bg-black/50 border rounded-lg text-cyan-50 placeholder:text-cyan-50/30',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all',
                errors.recipient ? 'border-red-500/50' : 'border-cyan-500/30'
              )}
            />
            {errors.recipient && (
              <p className="mt-1 text-sm text-red-400">{errors.recipient}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-50 mb-1">
              Amount (USDC)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 50.00"
              step="0.01"
              min="0.01"
              className={cn(
                'w-full px-4 py-2 bg-black/50 border rounded-lg text-cyan-50 placeholder:text-cyan-50/30',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all',
                errors.amount ? 'border-red-500/50' : 'border-cyan-500/30'
              )}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-400">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-50 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
              className={cn(
                'w-full px-4 py-2 bg-black/50 border rounded-lg text-cyan-50 placeholder:text-cyan-50/30 font-mono text-sm',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all',
                errors.walletAddress ? 'border-red-500/50' : 'border-cyan-500/30'
              )}
            />
            {errors.walletAddress && (
              <p className="mt-1 text-sm text-red-400">{errors.walletAddress}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-50 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g., Thanks for the amazing content! Keep building..."
              rows={3}
              className={cn(
                'w-full px-4 py-2 bg-black/50 border rounded-lg text-cyan-50 placeholder:text-cyan-50/30 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all',
                errors.message ? 'border-red-500/50' : 'border-cyan-500/30'
              )}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-black',
              'bg-gradient-to-r from-cyan-400 to-pink-500',
              'ring-2 ring-cyan-400/50 hover:shadow-neon-hover',
              'active:scale-95 transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'
            )}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Tip
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}