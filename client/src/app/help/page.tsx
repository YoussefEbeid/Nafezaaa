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
import { Footer } from '@/components/shared/Footer';

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
      <div className="bg-nafeza-700 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center text-nafeza-100 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-nafeza-accent flex-shrink-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">{content.title}</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-nafeza-100 max-w-3xl mb-2">{content.subtitle}</p>
          <p className="text-sm sm:text-base lg:text-lg text-nafeza-200 max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500 appearance-none bg-white"
              >
                {content.categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-slate-600">
              Showing {filteredFAQs.length} of {content.faqs.length} questions
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={expandAll}
                disabled={filteredFAQs.length === 0}
                className="flex-1 sm:flex-initial text-xs sm:text-sm"
              >
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={collapseAll}
                disabled={expandedFAQs.size === 0}
                className="flex-1 sm:flex-initial text-xs sm:text-sm"
              >
                Collapse All
              </Button>
            </div>
          </div>
        </div>

        {/* FAQs List */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {selectedCategory === 'All' ? (
              // Show grouped by category when "All" is selected
              Object.entries(faqsByCategory).map(([category, faqs]) => (
                <div key={category} className="space-y-3 sm:space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-nafeza-700 mb-3 sm:mb-4">{category}</h2>
                  {faqs.map((faq) => (
                    <Card 
                      key={faq.id} 
                      className="shadow-md border-none hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start gap-2 sm:gap-3 flex-1 pr-2">
                            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 mt-0.5 flex-shrink-0" />
                            <span className="font-semibold text-slate-800 text-sm sm:text-base lg:text-lg">{faq.question}</span>
                          </div>
                          <div className="ml-2 sm:ml-4 flex-shrink-0">
                            {expandedFAQs.has(faq.id) ? (
                              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                            )}
                          </div>
                        </button>
                        {expandedFAQs.has(faq.id) && (
                          <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-0 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                            <div className="pt-3 sm:pt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
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
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-2 sm:gap-3 flex-1 pr-2">
                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold text-slate-800 text-sm sm:text-base lg:text-lg">{faq.question}</span>
                      </div>
                      <div className="ml-2 sm:ml-4 flex-shrink-0">
                        {expandedFAQs.has(faq.id) ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                    {expandedFAQs.has(faq.id) && (
                      <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-0 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                        <div className="pt-3 sm:pt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
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
          <CardContent className="p-6 sm:p-8">
            <div className="text-center">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-nafeza-600 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-nafeza-700 mb-2">Still need help?</h2>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button variant="outline" onClick={() => router.push('/about')} className="w-full sm:w-auto">
                  Learn More About Nafeza
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

