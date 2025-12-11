'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface FAQContent {
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  faqs: FAQ[];
}

export default function HelpCenterPage() {
  const router = useRouter();
  const [content, setContent] = useState<FAQContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());

  useEffect(() => {
    api.get('/faq')
      .then(res => {
        setContent(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load FAQ content:', err);
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

  // Filter FAQs based on search and category
  const filteredFAQs = content.faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFAQs(newExpanded);
  };

  const expandAll = () => {
    setExpandedFAQs(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setExpandedFAQs(new Set());
  };

  // Group FAQs by category for better organization
  const faqsByCategory = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

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
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-12 h-12 text-nafeza-accent" />
            <h1 className="text-5xl md:text-6xl font-extrabold">{content.title}</h1>
          </div>
          <p className="text-xl text-nafeza-100 max-w-3xl mb-2">{content.subtitle}</p>
          <p className="text-lg text-nafeza-200 max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500 appearance-none bg-white"
              >
                {content.categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {filteredFAQs.length} of {content.faqs.length} questions
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={expandAll}
                disabled={filteredFAQs.length === 0}
              >
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={collapseAll}
                disabled={expandedFAQs.size === 0}
              >
                Collapse All
              </Button>
            </div>
          </div>
        </div>

        {/* FAQs List */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {selectedCategory === 'All' ? (
              // Show grouped by category when "All" is selected
              Object.entries(faqsByCategory).map(([category, faqs]) => (
                <div key={category} className="space-y-4">
                  <h2 className="text-2xl font-bold text-nafeza-700 mb-4">{category}</h2>
                  {faqs.map((faq) => (
                    <Card 
                      key={faq.id} 
                      className="shadow-md border-none hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <HelpCircle className="w-5 h-5 text-nafeza-600 mt-0.5 flex-shrink-0" />
                            <span className="font-semibold text-slate-800 text-lg">{faq.question}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {expandedFAQs.has(faq.id) ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </button>
                        {expandedFAQs.has(faq.id) && (
                          <div className="px-6 pb-4 pt-0 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                            <div className="pt-4 text-slate-700 leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))
            ) : (
              // Show flat list when a specific category is selected
              filteredFAQs.map((faq) => (
                <Card 
                  key={faq.id} 
                  className="shadow-md border-none hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <HelpCircle className="w-5 h-5 text-nafeza-600 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold text-slate-800 text-lg">{faq.question}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {expandedFAQs.has(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                    {expandedFAQs.has(faq.id) && (
                      <div className="px-6 pb-4 pt-0 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                        <div className="pt-4 text-slate-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">No questions found</p>
            <p className="text-slate-400 text-sm mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Contact Support Section */}
        <Card className="bg-gradient-to-r from-nafeza-50 to-white shadow-md border-none">
          <CardContent className="p-8">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-nafeza-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-nafeza-700 mb-2">Still need help?</h2>
              <p className="text-slate-600 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => router.push('/services')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => router.push('/about')}>
                  Learn More About Nafeza
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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

