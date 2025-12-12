'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, FileText, Building2, Ship, Calendar, CheckCircle, Clock, XCircle, Package } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';

interface AcidRequestDetail {
  id: number;
  acidNumber: string;
  importerName: string;
  exporterName: string;
  status: string;
  requestDate: string;
  itemCount: number;
  items?: Array<{
    id: number;
    hsCode: string;
    description: string;
    quantity: number;
    price: number;
    weight: number;
    totalValue: number;
  }>;
}

export default function AciDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { t, language } = useTranslation();
  const [request, setRequest] = useState<AcidRequestDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestId = params?.id as string;

  useEffect(() => {
    if (requestId) {
      loadRequestDetails();
    }
  }, [requestId]);

  const loadRequestDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/aci/${requestId}`);
      setRequest(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || t('common.failedToLoad'));
      console.error('Failed to load ACI request:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'draft':
        return <FileText className="h-5 w-5 text-orange-600" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nafeza-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="space-y-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/aci')}
          className={`${language === 'ar' ? 'ml-auto' : 'mr-auto'}`}
        >
          <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {t('common.backToHome')}
        </Button>
        <Card className="border-none shadow-md">
          <CardContent className="p-12 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('common.failedToLoad')}</h2>
            <p className="text-slate-500 mb-6">{error || 'Request not found'}</p>
            <Button onClick={() => router.push('/dashboard/aci')}>
              {t('dashboard.aciRequests')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard/aci')}
            className={`${language === 'ar' ? 'order-2' : ''}`}
          >
            <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('common.backToHome')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-nafeza-700">{t('dashboard.aciRequestDetails')}</h1>
            <p className="text-slate-500 mt-1">{language === 'ar' ? 'عرض تفاصيل طلب ACI' : 'View ACI request details'}</p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`p-3 rounded-lg ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500 mb-1">{t('dashboard.status')}</p>
              <p className="text-xl font-bold text-slate-800">{request.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ACID Number Card */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-nafeza-600" />
              {t('aci.acidNumber')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono font-bold text-nafeza-600">
              {request.acidNumber || '---'}
            </p>
          </CardContent>
        </Card>

        {/* Request Date Card */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-nafeza-600" />
              {t('dashboard.requestDate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-slate-700">
              {formatDate(request.requestDate)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Parties Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Importer Card */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-nafeza-600" />
              {t('aci.importer')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-slate-800">{request.importerName}</p>
          </CardContent>
        </Card>

        {/* Exporter Card */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-nafeza-600" />
              {t('aci.exporter')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-slate-800">{request.exporterName}</p>
          </CardContent>
        </Card>
      </div>

      {/* Items Summary */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-nafeza-600" />
            {t('dashboard.itemsSummary')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm text-slate-500 mb-1">{t('dashboard.totalItems')}</p>
              <p className="text-3xl font-bold text-nafeza-600">{request.itemCount}</p>
            </div>
            {request.items && request.items.length > 0 && (
              <div className={`text-right ${language === 'ar' ? 'text-left' : ''}`}>
                <p className="text-sm text-slate-500 mb-1">{t('dashboard.totalValue')}</p>
                <p className="text-2xl font-bold text-slate-800">
                  ${request.items.reduce((sum, item) => sum + (item.totalValue || 0), 0).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Items Table (if available) */}
      {request.items && request.items.length > 0 && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>{t('dashboard.itemsList')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className={`w-full text-sm text-slate-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">{t('tariff.hsCode')}</th>
                    <th className="px-6 py-3">{t('tariff.description')}</th>
                    <th className={`px-6 py-3 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t('dashboard.quantity')}</th>
                    <th className={`px-6 py-3 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t('dashboard.value')}</th>
                  </tr>
                </thead>
                <tbody>
                  {request.items.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-nafeza-600 font-medium">
                        {item.hsCode}
                      </td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className={`px-6 py-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                        ${(item.totalValue || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

