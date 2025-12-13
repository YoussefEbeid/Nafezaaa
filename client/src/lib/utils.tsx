import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 1. Tailwind Merger (Allows us to override styles in components)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 2. Currency Formatter (Egyptian Pounds & USD)
export function formatCurrency(amount: number, currency: 'EGP' | 'USD' = 'EGP') {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// 3. Status Color Mapper (For the Dashboard Badges)
export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'approved': return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800';
  }
}