import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date)
}

export function truncateAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatCurrency(amount: number | string): string { const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]/g, '')) : amount; return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num || 0); }

export function formatNumber(num: number): string { return new Intl.NumberFormat('en-US').format(num); }

export function generateId(): string { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export function slugify(str: string): string { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
