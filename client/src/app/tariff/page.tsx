'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, FileText, Hash, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TariffPage() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'code' | 'text'>('code');
  const [chapters, setChapters] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchCode, setSearchCode] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  useEffect(() => {
    api.get('/tariff/chapters').then(res => {
        console.log("Chapters loaded:", res.data); // Debugging
        setChapters(res.data);
    });
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setResults([]); 
    try {
      // FIX: Convert empty string to null so Backend doesn't crash
      const chapterIdToSend = selectedChapter === '' ? null : selectedChapter;

      const params = activeTab === 'code' 
        ? { type: 'code', query: searchCode }
        : { type: 'text', query: searchText, chapterId: chapterIdToSend };

      const res = await api.get('/tariff/search', { params });
      setResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-nafeza-700 text-white py-10 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <button onClick={() => router.push('/')} className="flex items-center text-nafeza-100 hover:text-white mb-3 sm:mb-4 transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Customs Tariff Search</h1>
          <p className="text-sm sm:text-base text-nafeza-200">Look up HS Codes, Duty Rates, and Regulations.</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20 mb-8 sm:mb-12">
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => { setActiveTab('code'); setResults([]); }}
              className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-medium flex items-center justify-center transition-colors ${
                activeTab === 'code' ? 'bg-white text-nafeza-600 border-t-2 border-t-nafeza-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Hash className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Search by Item Number</span><span className="sm:hidden">By Code</span>
            </button>
            <button
              onClick={() => { setActiveTab('text'); setResults([]); }}
              className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-medium flex items-center justify-center transition-colors ${
                activeTab === 'text' ? 'bg-white text-nafeza-600 border-t-2 border-t-nafeza-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Text Search</span><span className="sm:hidden">By Text</span>
            </button>
          </div>

          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-4 sm:space-y-6">
              
              {activeTab === 'code' ? (
                <div className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-left-4">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700">Item Number (HS Code)</label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input 
                      placeholder="e.g. 8517" 
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value)}
                      className="text-base sm:text-lg"
                    />
                    <Button size="lg" onClick={handleSearch} isLoading={isLoading} className="w-full sm:w-auto">
                      <Search className="w-4 h-4 mr-2" /> Inquire
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">Enter at least 4 digits.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Chapter</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-nafeza-500"
                        value={selectedChapter}
                        onChange={(e) => setSelectedChapter(e.target.value)}
                      >
                        <option value="">All Chapters</option>
                        {chapters.map((ch: any) => (
                          <option key={ch.id} value={ch.id}>{ch.code} - {ch.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Item Name</label>
                      <Input 
                        placeholder="e.g. Tomatoes" 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <Button size="lg" className="w-full sm:w-auto" onClick={handleSearch} isLoading={isLoading}>
                    <Search className="w-4 h-4 mr-2" /> Text Search
                  </Button>
                </div>
              )}

              {results.length > 0 && (
                <div className="mt-6 sm:mt-8 border rounded-lg overflow-hidden animate-in fade-in duration-500">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left min-w-[500px]">
                      <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-xs">
                        <tr>
                          <th className="px-3 sm:px-6 py-3 sm:py-4">HS Code</th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4">Description</th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Duty Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {results.map((item, i) => (
                          <tr key={i} className="bg-white hover:bg-blue-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-nafeza-600 font-bold">{item.hsCode}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-700">{item.description}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                              <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${item.dutyRate === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {item.dutyRate}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {!isLoading && results.length === 0 && (searchCode || searchText) && (
                <div className="text-center py-8 text-slate-400">
                  No items found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}