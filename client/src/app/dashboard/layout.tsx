'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const language = useLanguageStore((state) => state.language);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Simple client-side protection
  // (The real protection is the API returning 401, but this helps UX)
  useEffect(() => {
    const token = localStorage.getItem('nafeza_token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. The Fixed Sidebar */}
      <Sidebar />

      {/* 2. The Main Content Area */}
      <main className={`flex-1 p-8 ${language === 'ar' ? 'mr-64' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}