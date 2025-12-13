'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  Calendar,
  Newspaper,
  Share2,
  Printer
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Footer } from '@/components/shared/Footer';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  publishedDate: string;
  category: string;
  imageUrl?: string;
  author?: string;
  tags?: string[];
}

export default function NewsArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articleId) {
      api.get(`/media/news/${articleId}`)
        .then(res => {
          setArticle(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to load article:', err);
          setIsLoading(false);
        });
    }
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nafeza-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Article not found</p>
          <Button onClick={() => router.push('/media')}>Back to Media Center</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-nafeza-700 text-white py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/media')} 
            className="flex items-center text-nafeza-100 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Media Center
          </button>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-nafeza-600 text-white">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-nafeza-100 text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{formatDate(article.publishedDate)}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4">{article.title}</h1>
          {article.description && (
            <p className="text-base sm:text-lg lg:text-xl text-nafeza-100">{article.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.imageUrl && (
            <div className="w-full h-48 sm:h-64 md:h-96 bg-slate-200 overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-200">
              {article.author && (
                <div className="text-slate-600 text-sm sm:text-base">
                  <span className="font-semibold">By:</span> {article.author}
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Published on {formatDate(article.publishedDate)}</span>
              </div>
              <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
                >
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="flex items-center gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
                >
                  <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                  Print
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <div 
                className="text-slate-700 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-slate-600 font-semibold mr-2 text-xs sm:text-sm">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-nafeza-50 text-nafeza-700 hover:bg-nafeza-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </article>

        {/* Navigation */}
        <div className="mt-6 sm:mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push('/media')}
            className="flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to All News
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
