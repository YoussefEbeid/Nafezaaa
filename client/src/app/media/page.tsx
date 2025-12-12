'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  Calendar,
  Filter,
  Search,
  Newspaper
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/shared/Footer';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  category: string;
  imageUrl?: string;
  content?: string;
}

interface MediaContent {
  title: string;
  subtitle: string;
  description: string;
  news: NewsItem[];
  totalNews: number;
  categories: string[];
}

export default function MediaCenterPage() {
  const router = useRouter();
  const [content, setContent] = useState<MediaContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    api.get('/media/news')
      .then(res => {
        setContent(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load media content:', err);
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

  // Filter news based on search and category
  const filteredNews = content.news.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

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
            <Newspaper className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-nafeza-accent flex-shrink-0" />
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500"
              />
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500 appearance-none bg-white"
                >
                  <option value="All">All Categories</option>
                  {content.categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            Showing {filteredNews.length} of {content.totalNews} news articles
          </div>
        </div>

        {/* News List */}
        {paginatedNews.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {paginatedNews.map((item) => (
              <Card 
                key={item.id} 
                className="shadow-md border-none hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/media/${item.id}`)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {item.imageUrl && (
                      <div className="w-full sm:w-48 h-48 sm:h-32 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-nafeza-50 text-nafeza-700">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{formatDate(item.publishedDate)}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 hover:text-nafeza-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">No news articles found</p>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
