'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { Ship, FileText, Search, ArrowRight, ShieldCheck, Globe, TrendingUp, ChevronRight } from 'lucide-react';
import api from '@/lib/axios';

interface Currency {
  code: string;
  name: string;
  rate: number;
  change: number;
  flag: string;
}

export default function HomePage() {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    api.get('/currency/rates').then(res => setCurrencies(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Navbar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-nafeza-700 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl text-nafeza-700 tracking-tight">NAFEZA<span className="text-nafeza-accent">.GOV</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/currencies')}>Currency Rates</Button>
            <Button variant="ghost" onClick={() => router.push('/tariff')}>Tariff Search</Button> {/* Quick Link */}
            <div className="h-6 w-px bg-slate-200" />
            <Button variant="outline" onClick={() => router.push('/auth/login')}>Log In</Button>
            <Button onClick={() => router.push('/auth/register')}>Register</Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-nafeza-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[500px]">
          
          {/* Currency Widget */}
          <div className="w-full md:w-80 bg-nafeza-800/50 backdrop-blur-sm border-r border-white/10 p-6 flex flex-col z-10">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-nafeza-accent" /> Exchange Rates
            </h3>
            <div className="space-y-4 flex-1">
              {currencies.length > 0 ? currencies.map((curr) => (
                <div key={curr.code} className="flex justify-between items-center text-white border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{curr.flag}</span>
                    <div>
                      <div className="text-xs text-nafeza-100">{curr.name}</div>
                      <div className="font-bold">{curr.code}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-nafeza-accent">{curr.rate.toFixed(2)}</div>
                    <div className={`text-xs ${curr.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {curr.change > 0 ? '+' : ''}{curr.change.toFixed(3)}
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-white/50 text-sm">Loading rates...</p>
              )}
            </div>
            <button onClick={() => router.push('/currencies')} className="mt-6 text-sm text-nafeza-accent hover:text-white flex items-center transition-colors">
              More Currencies <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Hero Content */}
          <div className="flex-1 p-12 flex flex-col justify-center text-white relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Advance Cargo <br/>
              <span className="text-nafeza-accent">Information System</span>
            </h1>
            <p className="text-lg text-nafeza-100 max-w-xl mb-8">
              The national single window connecting importers, exporters, and customs in one secure blockchain-powered platform.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-nafeza-accent hover:bg-yellow-600 text-white border-none" onClick={() => router.push('/auth/login')}>
                Dashboard Access
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => router.push('/aci/validate')}>
                Validate ACID
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Digital Services (FIXED LINKS HERE) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-nafeza-700 mb-12">Digital Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={FileText} 
              title="ACI Filing" 
              desc="Submit Advance Cargo Information 48 hours before shipping."
              link="/auth/login" // Redirects to Login/Dashboard
            />
            <ServiceCard 
              icon={Search} 
              title="Tariff Search" 
              desc="Check HS Codes, Customs Duties, and Taxes instantly."
              link="/tariff" // Redirects to the Tariff Page we just built
            />
            <ServiceCard 
              icon={ShieldCheck} 
              title="e-Signature" 
              desc="Sign declarations securely using your e-Token USB."
              link="/help/etoken" // Example link
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><div className="text-white font-bold text-xl mb-4">NAFEZA</div><p className="text-sm">Misr Technology Services (MTS)</p></div>
          <div><h4 className="text-white font-semibold mb-4">Platform</h4><ul className="space-y-2 text-sm"><li><button onClick={() => router.push('/about')} className="hover:text-white transition-colors cursor-pointer">About Us</button></li><li><button onClick={() => router.push('/services')} className="hover:text-white transition-colors cursor-pointer">Services</button></li></ul></div>
          <div><h4 className="text-white font-semibold mb-4">Support</h4><ul className="space-y-2 text-sm"><li><button onClick={() => router.push('/help')} className="hover:text-white transition-colors cursor-pointer">Help Center</button></li><li className="hover:text-white cursor-pointer transition-colors">Contact Support</li></ul></div>
          <div><h4 className="text-white font-semibold mb-4">Connect</h4><Globe className="h-5 w-5 hover:text-white cursor-pointer" /></div>
        </div>
      </footer>
    </div>
  );
}

// Updated Component to accept 'link'
function ServiceCard({ icon: Icon, title, desc, link }: { icon: any, title: string, desc: string, link: string }) {
  const router = useRouter(); // Hook needed inside the component
  
  return (
    <Card 
      className="hover:shadow-lg transition-shadow border-none shadow-md cursor-pointer group" 
      onClick={() => router.push(link)} // Add Click Handler here
    >
      <CardContent className="pt-6 text-center">
        <div className="w-12 h-12 bg-nafeza-50 text-nafeza-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-nafeza-600 group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-lg text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        <div className="mt-4 flex items-center justify-center text-nafeza-600 text-sm font-medium">
          Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}