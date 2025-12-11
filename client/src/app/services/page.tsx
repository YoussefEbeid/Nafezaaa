'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LogisticCenter {
  id: number;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface ServicesContent {
  title: string;
  subtitle: string;
  description: string;
  centers: LogisticCenter[];
  totalCenters: number;
  services: string[];
}

export default function ServicesPage() {
  const router = useRouter();
  const [content, setContent] = useState<ServicesContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [expandedCenter, setExpandedCenter] = useState<number | null>(null);

  useEffect(() => {
    api.get('/logisticcenters')
      .then(res => {
        setContent(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load logistic centers:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nafeza-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load content</p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Filter centers based on search and service
  const filteredCenters = content.centers.filter(center => {
    const matchesSearch = 
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesService = 
      selectedService === 'all' || 
      center.services.some(s => s.toLowerCase().includes(selectedService.toLowerCase()));

    return matchesSearch && matchesService;
  });

  // Get unique services for filter
  const allServices = Array.from(
    new Set(content.centers.flatMap(c => c.services))
  ).sort();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-nafeza-700 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center text-nafeza-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{content.title}</h1>
          <p className="text-xl text-nafeza-100 max-w-3xl mb-2">{content.subtitle}</p>
          <p className="text-lg text-nafeza-200 max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Statistics Banner */}
        <div className="bg-gradient-to-r from-nafeza-600 to-nafeza-700 rounded-lg shadow-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-extrabold text-nafeza-accent mb-2">
                {content.totalCenters}
              </div>
              <div className="text-lg font-semibold">Logistics Centers</div>
              <div className="text-sm text-nafeza-100">Across Egypt</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-nafeza-accent mb-2">
                24/7
              </div>
              <div className="text-lg font-semibold">Online Services</div>
              <div className="text-sm text-nafeza-100">Available Anytime</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-nafeza-accent mb-2">
                {content.services.length}+
              </div>
              <div className="text-lg font-semibold">Services Offered</div>
              <div className="text-sm text-nafeza-100">Comprehensive Solutions</div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <section>
          <h2 className="text-3xl font-bold text-nafeza-700 mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.services.map((service, index) => (
              <Card key={index} className="shadow-md border-none hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-nafeza-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{service}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500"
                />
              </div>
              <div className="md:w-64">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500 appearance-none bg-white"
                  >
                    <option value="all">All Services</option>
                    {allServices.map((service, index) => (
                      <option key={index} value={service.toLowerCase()}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              Showing {filteredCenters.length} of {content.centers.length} centers
            </div>
          </div>
        </section>

        {/* Centers List */}
        <section>
          <h2 className="text-3xl font-bold text-nafeza-700 mb-6">Logistics Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <Card 
                key={center.id} 
                className="shadow-md border-none hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setExpandedCenter(expandedCenter === center.id ? null : center.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-5 h-5 text-nafeza-600" />
                        <h3 className="font-bold text-lg text-slate-800">{center.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{center.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <a href={`tel:${center.phone}`} className="hover:text-nafeza-600 transition-colors">
                        {center.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${center.email}`} className="hover:text-nafeza-600 transition-colors truncate">
                        {center.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{center.workingHours}</span>
                    </div>
                  </div>

                  {expandedCenter === center.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
                      <h4 className="font-semibold text-slate-800 mb-2">Services Offered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {center.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nafeza-50 text-nafeza-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-slate-400 text-center">
                    Click to {expandedCenter === center.id ? 'collapse' : 'expand'} details
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No centers found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedService('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-bold text-xl mb-4">NAFEZA</div>
            <p className="text-sm">Misr Technology Services (MTS)</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => router.push('/about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => router.push('/services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => router.push('/help')} className="hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Support</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

