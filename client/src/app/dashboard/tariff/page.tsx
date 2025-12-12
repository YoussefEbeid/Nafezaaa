'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, FileText, Hash } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';

export default function TariffSearchPage() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'code' | 'text'>('code');
  const [chapters, setChapters] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchCode, setSearchCode] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  useEffect(() => {
    api.get('/tariff/chapters').then(res => {
      setChapters(res.data);
    });
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setResults([]);
    try {
      const chapterIdToSend = selectedChapter === '' ? null : selectedChapter;

      const params = activeTab === 'code'
        ? { type: 'code', query: searchCode }
        : { type: 'text', query: searchText, chapterId: chapterIdToSend };

      const res = await api.get('/tariff/search', { params });
      setResults(res.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-nafeza-700">{t('dashboard.tariffSearch')}</h1>
        <p className="text-slate-500 mt-1">{t('dashboard.lookupHSCodes')}</p>
      </div>

      <Card className="border-none shadow-md">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setActiveTab('code'); setResults([]); }}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center transition-colors ${
              activeTab === 'code' ? 'bg-white text-nafeza-600 border-t-2 border-t-nafeza-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Hash className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} /> {t('dashboard.searchByItemNumber')}
          </button>
          <button
            onClick={() => { setActiveTab('text'); setResults([]); }}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center transition-colors ${
              activeTab === 'text' ? 'bg-white text-nafeza-600 border-t-2 border-t-nafeza-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <FileText className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} /> {t('dashboard.textSearch')}
          </button>
        </div>

        <CardContent className="p-8">
          <div className="space-y-6">
            {activeTab === 'code' ? (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">{t('dashboard.itemNumberHSCode')}</label>
                <div className={`flex gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Input
                    placeholder={t('dashboard.itemNumberPlaceholder')}
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="text-lg"
                  />
                  <Button size="lg" onClick={handleSearch} isLoading={isLoading}>
                    <Search className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} /> {t('dashboard.inquire')}
                  </Button>
                </div>
                <p className="text-xs text-slate-400">{t('dashboard.enterAtLeast4Digits')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('dashboard.chapter')}</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nafeza-500"
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                    >
                      <option value="">{t('dashboard.allChapters')}</option>
                      {chapters.map((ch: any) => (
                        <option key={ch.id} value={ch.id}>{ch.code} - {ch.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('dashboard.itemName')}</label>
                    <Input
                      placeholder={t('dashboard.itemNamePlaceholder')}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                <Button size="lg" className="w-full md:w-auto" onClick={handleSearch} isLoading={isLoading}>
                  <Search className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} /> {t('dashboard.textSearch')}
                </Button>
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-8 border rounded-lg overflow-hidden">
                <table className={`w-full text-sm text-slate-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">{t('tariff.hsCode')}</th>
                      <th className="px-6 py-4">{t('tariff.description')}</th>
                      <th className={`px-6 py-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t('tariff.dutyRate')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((item, i) => (
                      <tr key={i} className="bg-white hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-nafeza-600 font-bold">{item.hsCode}</td>
                        <td className="px-6 py-4 text-slate-700">{item.description}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.dutyRate === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {item.dutyRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!isLoading && results.length === 0 && (searchCode || searchText) && (
              <div className="text-center py-8 text-slate-400">
                {t('common.noResults')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

