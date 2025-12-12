'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAciList } from '@/features/aci/api/useAci';
import { Plus, FileText, Eye, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';
// Date formatting helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function AciRequestsPage() {
  const router = useRouter();
  const { data: requests, isLoading } = useAciList();
  const { t, language } = useTranslation();

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nafeza-700">{t('dashboard.aciRequests')}</h1>
          <p className="text-slate-500 mt-1">{language === 'ar' ? 'إدارة طلبات معلومات الشحن المسبق' : 'Manage your Advance Cargo Information requests'}</p>
        </div>
        <Button onClick={() => router.push('/dashboard/aci/new')} className="shadow-lg bg-nafeza-accent hover:bg-yellow-600 text-white">
          <Plus className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          {t('dashboard.newACIRequest')}
        </Button>
      </div>

      {/* Requests Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>{t('dashboard.allRequests')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-slate-500">Loading requests...</div>
          ) : !requests || requests.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <FileText className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-slate-500">No ACI requests found</p>
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
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="bg-white border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-nafeza-600 font-medium">
                        {request.acidNumber}
                      </td>
                      <td className="px-6 py-4">{request.exporterName}</td>
                      <td className="px-6 py-4">
                        {formatDate(request.requestDate)}
                      </td>
                      <td className="px-6 py-4">{request.itemCount}</td>
                      <td className="px-6 py-4">
                        <span className={`${getStatusColor(request.status)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push(`/dashboard/aci/${request.id}`)}
                        >
                          <Eye className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
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

