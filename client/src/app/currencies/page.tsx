'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

interface Currency {
  code: string;
  name: string;
  rate: number;
  change: number;
  flag: string;
}

export default function CurrenciesPage() {
  const router = useRouter();
  const [rates, setRates] = useState<Currency[]>([]);
  const [expandedCode, setExpandedCode] = useState<string | null>('USD'); 
  const [historyData, setHistoryData] = useState<any[]>([]);
  
  // New State for Time Range
  const [timeRange, setTimeRange] = useState<'1M' | '3M'>('1M');

  // 1. Fetch Rates
  useEffect(() => {
    api.get('/currency/rates').then(res => setRates(res.data));
  }, []);

  // 2. Fetch History when row is expanded OR time range changes
  useEffect(() => {
    if (expandedCode) {
      // In a real app, you would send ?range=3M to the backend
      // Here we just fetch the same mock data for the demo
      api.get(`/currency/history/${expandedCode}`).then(res => {
        // Mocking the "3 Months" look by slicing data or duplicating it
        const data = timeRange === '1M' ? res.data.slice(0, 15) : res.data; 
        setHistoryData(data);
      });
    }
  }, [expandedCode, timeRange]);

  const toggleExpand = (code: string) => {
    setExpandedCode(expandedCode === code ? null : code);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => router.push('/')} className="flex items-center text-slate-500 hover:text-nafeza-600 mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
            </button>
            <h1 className="text-3xl font-bold text-nafeza-700">Foreign Exchange Rates</h1>
            <p className="text-slate-500">Official rates according to the Egyptian Customs Authority</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-nafeza-600">Last Update</p>
            <p className="text-slate-600">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Currency List */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-12 bg-slate-100 p-4 font-semibold text-slate-700 text-sm">
              <div className="col-span-1"></div>
              <div className="col-span-4">Currency</div>
              <div className="col-span-2">Code</div>
              <div className="col-span-3 text-right">Exchange Rate (EGP)</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {rates.map((curr) => (
              <div key={curr.code} className="border-b last:border-0">
                {/* Row */}
                <div 
                  className={`grid grid-cols-12 p-4 items-center hover:bg-slate-50 transition-colors cursor-pointer ${expandedCode === curr.code ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleExpand(curr.code)}
                >
                  <div className="col-span-1 text-2xl">{curr.flag}</div>
                  <div className="col-span-4 font-medium text-slate-800">{curr.name}</div>
                  <div className="col-span-2 font-mono text-slate-500">{curr.code}</div>
                  <div className="col-span-3 text-right font-bold text-nafeza-700">{curr.rate.toFixed(4)}</div>
                  <div className="col-span-2 flex justify-center text-slate-400">
                    {expandedCode === curr.code ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

                {/* Expanded Chart Area */}
                {expandedCode === curr.code && (
                  <div className="p-6 bg-white border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-bold text-nafeza-600">
                        Exchange rate of {curr.name} ({curr.code}) against Egyptian Pound
                      </h3>
                      
                      {/* INTERACTIVE BUTTONS */}
                      <div className="flex bg-slate-100 rounded-md p-1">
                        <button 
                          onClick={() => setTimeRange('1M')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-all ${timeRange === '1M' ? 'bg-white text-nafeza-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          1 Month
                        </button>
                        <button 
                          onClick={() => setTimeRange('3M')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-all ${timeRange === '3M' ? 'bg-white text-nafeza-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          3 Months
                        </button>
                      </div>
                    </div>
                    
                    {/* CHART */}
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historyData}>
                          <defs>
                            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#334e68" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#334e68" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#94a3b8" tickLine={false} axisLine={false} />
                          <YAxis domain={['auto', 'auto']} tick={{fontSize: 12}} stroke="#94a3b8" tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#334e68', fontWeight: 'bold' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#334e68" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorRate)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}