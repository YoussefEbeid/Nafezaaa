'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { Ship, FileText, Search, ArrowRight, ShieldCheck, Globe, TrendingUp, ChevronRight, Menu, X } from 'lucide-react';
import api from '@/lib/axios';
import { Footer } from '@/components/shared/Footer';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    api.get('/currency/rates').then(res => setCurrencies(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Navbar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 sm:h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-nafeza-700 text-white p-1.5 sm:p-2 rounded-lg">
                <span className="font-bold text-lg sm:text-xl">N</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-nafeza-700 tracking-tight">NAFEZA<span className="text-nafeza-accent">.GOV</span></span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <Button variant="ghost" onClick={() => router.push('/currencies')} className="text-sm">Currency Rates</Button>
              <Button variant="ghost" onClick={() => router.push('/tariff')} className="text-sm">Tariff Search</Button>
              <Globe className="h-5 w-5 text-slate-600 hover:text-nafeza-600 cursor-pointer transition-colors" />
              <div className="h-6 w-px bg-slate-200" />
              <Button variant="outline" onClick={() => router.push('/auth/login')} size="sm">Log In</Button>
              <Button onClick={() => router.push('/auth/register')} size="sm">Register</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4 space-y-3 animate-in slide-in-from-top">
              <Button variant="ghost" onClick={() => { router.push('/currencies'); setMobileMenuOpen(false); }} className="w-full justify-start">Currency Rates</Button>
              <Button variant="ghost" onClick={() => { router.push('/tariff'); setMobileMenuOpen(false); }} className="w-full justify-start">Tariff Search</Button>
              <div className="flex items-center gap-2 px-3 py-2">
                <Globe className="h-5 w-5 text-slate-600" />
                <span className="text-sm text-slate-600">Language</span>
              </div>
              <div className="border-t border-slate-200 pt-3 space-y-2">
                <Button variant="outline" onClick={() => { router.push('/auth/login'); setMobileMenuOpen(false); }} className="w-full">Log In</Button>
                <Button onClick={() => { router.push('/auth/register'); setMobileMenuOpen(false); }} className="w-full">Register</Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-nafeza-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[400px] sm:min-h-[500px]">
          
          {/* Currency Widget */}
          <div className="w-full lg:w-80 bg-nafeza-800/50 backdrop-blur-sm lg:border-r border-white/10 border-b lg:border-b-0 p-4 sm:p-6 flex flex-col z-10">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
              <TrendingUp className="w-4 h-4 mr-2 text-nafeza-accent" /> Exchange Rates
            </h3>
            <div className="space-y-3 sm:space-y-4 flex-1">
              {currencies.length > 0 ? currencies.map((curr) => (
                <div key={curr.code} className="flex justify-between items-center text-white border-b border-white/10 pb-2 sm:pb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{curr.flag}</span>
                    <div>
                      <div className="text-xs text-nafeza-100">{curr.name}</div>
                      <div className="font-bold text-sm sm:text-base">{curr.code}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-nafeza-accent text-sm sm:text-base">{curr.rate.toFixed(2)}</div>
                    <div className={`text-xs ${curr.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {curr.change > 0 ? '+' : ''}{curr.change.toFixed(3)}
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-white/50 text-sm">Loading rates...</p>
              )}
            </div>
            <button onClick={() => router.push('/currencies')} className="mt-4 sm:mt-6 text-xs sm:text-sm text-nafeza-accent hover:text-white flex items-center transition-colors">
              More Currencies <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Hero Content */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-white relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Advance Cargo <br className="hidden sm:block"/>
              <span className="text-nafeza-accent">Information System</span>
            </h1>
            <p className="text-base sm:text-lg text-nafeza-100 max-w-xl mb-6 sm:mb-8">
              The national single window connecting importers, exporters, and customs in one secure blockchain-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-nafeza-accent hover:bg-yellow-600 text-white border-none w-full sm:w-auto" onClick={() => router.push('/auth/login')}>
                Dashboard Access
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto" onClick={() => router.push('/aci/validate')}>
                Validate ACID
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Digital Services (FIXED LINKS HERE) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-nafeza-700 mb-8 sm:mb-12">Digital Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
      <Footer />
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