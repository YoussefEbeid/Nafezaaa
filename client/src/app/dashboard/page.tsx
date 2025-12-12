'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore, useLanguageStore } from '@/lib/store';
import { Plus, FileText, Activity, CreditCard, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { useAciList } from '@/features/aci/api/useAci';
import { useTranslation } from '@/lib/i18n';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { data: requests, isLoading } = useAciList();
  const { t, language } = useTranslation();

  // Calculate stats from real data
  const activeShipments = requests?.filter(r => 
    r.status.toLowerCase() === 'submitted' || r.status.toLowerCase() === 'approved'
  ).length || 0;
  
  const pendingApproval = requests?.filter(r => 
    r.status.toLowerCase() === 'draft'
  ).length || 0;

  const stats = [
    { title: t('dashboard.activeShipments'), value: activeShipments.toString(), icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: t('dashboard.pendingApproval'), value: pendingApproval.toString(), icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: t('dashboard.walletBalance'), value: formatCurrency(45200), icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  // Get recent declarations (approved/submitted, sorted by date)
  const recentDeclarations = requests
    ?.filter(r => r.status.toLowerCase() === 'approved' || r.status.toLowerCase() === 'submitted')
    .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
    .slice(0, 5) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nafeza-700">{t('dashboard.overview')}</h1>
          <p className="text-slate-500 mt-1">{language === 'ar' ? `مرحباً، ${user?.name || 'تاجر'}. إليك ما يحدث اليوم.` : `Hello, ${user?.name || 'Trader'}. Here is what's happening today.`}</p>
        </div>
        <Button onClick={() => router.push('/dashboard/aci/new')} className="shadow-lg bg-nafeza-accent hover:bg-yellow-600 text-white">
          <Plus className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          {t('dashboard.newACIRequest')}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className={`mt-4 flex items-center text-xs text-green-600 font-medium ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className={`h-3 w-3 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} /> +2.5% from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>{t('dashboard.recentDeclarations')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-slate-500">Loading declarations...</div>
          ) : recentDeclarations.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <FileText className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-slate-500">No declarations found</p>
              <Button onClick={() => router.push('/dashboard/aci/new')} variant="outline">
                Create Your First Request
              </Button>
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <table className={`w-full text-sm text-slate-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">ACID Number</th>
                    <th className="px-6 py-3">Exporter</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeclarations.map((declaration) => (
                    <tr key={declaration.id} className="bg-white border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-nafeza-600 font-medium">
                        {declaration.acidNumber}
                      </td>
                      <td className="px-6 py-4">{declaration.exporterName}</td>
                      <td className="px-6 py-4">{formatDate(declaration.requestDate)}</td>
                      <td className="px-6 py-4">
                        <span className={`${getStatusColor(declaration.status)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                          {declaration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push(`/dashboard/aci/${declaration.id}`)}
                        >
                          {t('common.view')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}