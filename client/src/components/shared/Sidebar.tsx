'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, Ship, FileSearch, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';

const menuItems = [
  { nameKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { nameKey: 'aciRequests', href: '/dashboard/aci', icon: FileText },
  { nameKey: 'declarations46KM', href: '/dashboard/declarations', icon: Ship },
  { nameKey: 'tariffSearch', href: '/dashboard/tariff', icon: FileSearch },
  { nameKey: 'companyProfile', href: '/dashboard/profile', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize Router
  const logout = useAuthStore((state) => state.logout);
  const { t, language } = useTranslation();

  const handleLogout = () => {
    logout(); // Clear state
    router.push('/'); // Force navigate to Home
  };

  return (
    <div className={`h-screen w-64 bg-nafeza-700 text-white flex flex-col fixed top-0 z-50 shadow-xl ${language === 'ar' ? 'right-0' : 'left-0'}`}>
      <div className="h-16 flex items-center justify-center border-b border-nafeza-600">
        <h1 className="text-2xl font-bold tracking-wider">NAFEZA<span className="text-nafeza-accent">.NEXT</span></h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 group',
                isActive 
                  ? `bg-nafeza-600 text-white shadow-lg ${language === 'ar' ? '-translate-x-1' : 'translate-x-1'}` 
                  : 'text-nafeza-100 hover:bg-nafeza-600 hover:text-white'
              )}
            >
              <item.icon className={cn(`${language === 'ar' ? 'ml-3' : 'mr-3'} h-5 w-5`, isActive ? "text-nafeza-accent" : "text-gray-400 group-hover:text-white")} />
              {t(`dashboard.${item.nameKey}`)}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-nafeza-600">
        <button 
          onClick={handleLogout} // Use the new handler
          className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-200 hover:text-red-100 hover:bg-red-900/20 rounded-md transition-colors"
        >
          <LogOut className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-5 w-5`} />
          {t('common.signOut')}
        </button>
      </div>
    </div>
  );
}