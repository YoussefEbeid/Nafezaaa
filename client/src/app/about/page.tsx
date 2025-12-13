'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  FileText, 
  Search, 
  ShieldCheck, 
  Folder, 
  CreditCard, 
  Activity,
  Target,
  Eye,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Building,
  Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/shared/Footer';

interface AboutContent {
  overview: {
    title: string;
    description: string;
    subtitle: string;
  };
  singleWindow: {
    title: string;
    description: string;
    benefits: string[];
  };
  services: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  statistics: {
    title: string;
    items: Array<{
      label: string;
      value: string;
      description: string;
    }>;
  };
  network: {
    title: string;
    description: string;
    locations: string[];
  };
  development: {
    title: string;
    description: string;
    principles: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    address: string;
  };
}

const iconMap: Record<string, any> = {
  FileText,
  Search,
  ShieldCheck,
  Folder,
  CreditCard,
  Activity,
};

// Helper function to parse statistic value (e.g., "50,000+", "2M+", "70%", "15+")
function parseStatValue(value: string): { numericValue: number; suffix: string; format: 'number' | 'percentage' | 'million' } {
  // Remove commas and extract numeric part
  const cleanValue = value.replace(/,/g, '');
  
  // Check for percentage
  if (cleanValue.includes('%')) {
    const num = parseFloat(cleanValue.replace('%', ''));
    return { numericValue: num, suffix: '%', format: 'percentage' };
  }
  
  // Check for million (M)
  if (cleanValue.toUpperCase().includes('M')) {
    const num = parseFloat(cleanValue.replace(/[M+]/gi, ''));
    return { numericValue: num * 1000000, suffix: 'M+', format: 'million' };
  }
  
  // Check for thousand (K)
  if (cleanValue.toUpperCase().includes('K')) {
    const num = parseFloat(cleanValue.replace(/[K+]/gi, ''));
    return { numericValue: num * 1000, suffix: 'K+', format: 'number' };
  }
  
  // Regular number with possible +
  const num = parseFloat(cleanValue.replace('+', ''));
  const hasPlus = cleanValue.includes('+');
  return { numericValue: num, suffix: hasPlus ? '+' : '', format: 'number' };
}

// Helper function to format the animated value back to display format
function formatAnimatedValue(count: number, originalValue: string): string {
  const parsed = parseStatValue(originalValue);
  
  if (parsed.format === 'percentage') {
    return `${Math.round(count)}%`;
  }
  
  if (parsed.format === 'million') {
    const millions = count / 1000000;
    if (millions >= 1) {
      return `${millions.toFixed(millions >= 10 ? 0 : 1)}M${parsed.suffix}`;
    }
    // If less than 1 million, show in thousands
    const thousands = count / 1000;
    return `${thousands.toFixed(0)}K${parsed.suffix}`;
  }
  
  // Regular number - add commas for thousands
  const rounded = Math.round(count);
  return `${rounded.toLocaleString()}${parsed.suffix}`;
}

// Animated Stat Component
function AnimatedStat({ 
  value, 
  label, 
  description, 
  shouldStart 
}: { 
  value: string; 
  label: string; 
  description: string;
  shouldStart: boolean;
}) {
  const parsed = parseStatValue(value);
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!shouldStart) return;

    // Reset and start animation
    setDisplayValue(0);
    
    const startTime = performance.now();
    const duration = 2000;
    const startValue = 0;
    const targetValue = parsed.numericValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetValue - startValue) * easeOut;

      setDisplayValue(Math.max(0, Math.round(currentValue)));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [shouldStart, parsed.numericValue]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-nafeza-accent mb-2">
        {formatAnimatedValue(displayValue, value)}
      </div>
      <div className="text-lg font-semibold mb-1">{label}</div>
      <div className="text-sm text-nafeza-100">{description}</div>
    </div>
  );
}

export default function AboutPage() {
  const router = useRouter();
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    api.get('/about')
      .then(res => {
        setContent(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load about content:', err);
        setIsLoading(false);
      });
  }, []);

  // Intersection Observer for statistics section
  useEffect(() => {
    // Wait for content to load before setting up observer
    if (!content || statsStarted) return;

    let observer: IntersectionObserver | null = null;
    let visibilityTimer: NodeJS.Timeout | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const currentRef = statsSectionRef.current;
      if (!currentRef) {
        // Fallback: start animation after 1 second if ref is not available
        fallbackTimer = setTimeout(() => {
          setStatsStarted(true);
        }, 1000);
        return;
      }

      // Check if section is already visible (in case user scrolls fast or section is at top)
      const checkVisibility = () => {
        const rect = currentRef.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
        return isVisible;
      };

      if (checkVisibility()) {
        // Section is already visible, start animation after a short delay
        visibilityTimer = setTimeout(() => {
          setStatsStarted(true);
        }, 300);
        return;
      }

      // Set up intersection observer for when section comes into view
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setStatsStarted(true);
              if (observer) {
                observer.disconnect();
              }
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 10% of the section is visible
          rootMargin: '0px 0px -50px 0px', // Trigger slightly before fully visible
        }
      );

      observer.observe(currentRef);

      // Fallback: start animation after 3 seconds if observer doesn't trigger
      fallbackTimer = setTimeout(() => {
        if (!statsStarted) {
          setStatsStarted(true);
        }
        if (observer) {
          observer.disconnect();
        }
      }, 3000);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (visibilityTimer) {
        clearTimeout(visibilityTimer);
      }
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [content, statsStarted]);

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4">{content.overview.title}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-nafeza-100 max-w-3xl">{content.overview.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Overview Section */}
        <section className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-12">
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">{content.overview.description}</p>
          </div>
        </section>

        {/* Single Window Concept */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700 mb-4 sm:mb-6">{content.singleWindow.title}</h2>
          <Card className="shadow-md border-none">
            <CardContent className="p-6 sm:p-8">
              <p className="text-slate-700 text-base sm:text-lg mb-4 sm:mb-6">{content.singleWindow.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {content.singleWindow.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card className="shadow-md border-none bg-gradient-to-br from-nafeza-50 to-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-nafeza-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-nafeza-700">{content.mission.title}</h3>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{content.mission.description}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none bg-gradient-to-br from-nafeza-50 to-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-nafeza-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-nafeza-700">{content.vision.title}</h3>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{content.vision.description}</p>
            </CardContent>
          </Card>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700 mb-4 sm:mb-6">{content.services.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {content.services.items.map((service, index) => {
              const Icon = iconMap[service.icon] || FileText;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-none shadow-md">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-nafeza-50 text-nafeza-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Statistics */}
        <section 
          ref={(el) => {
            if (el) {
              (statsSectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
            }
          }}
          className="bg-nafeza-700 rounded-lg shadow-xl p-6 sm:p-8 md:p-12 text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">{content.statistics.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.statistics.items.map((stat, index) => (
              <AnimatedStat
                key={index}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                shouldStart={statsStarted}
              />
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700 mb-4 sm:mb-6">{content.values.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {content.values.items.map((value, index) => (
              <Card key={index} className="shadow-md border-none">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg text-nafeza-600 mb-2">{value.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Centers Network */}
        <section>
          <Card className="shadow-md border-none">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-nafeza-600 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700">{content.network.title}</h2>
              </div>
              <p className="text-slate-700 text-sm sm:text-base mb-4 sm:mb-6">{content.network.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {content.network.locations.map((location, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-700 text-sm sm:text-base">
                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-nafeza-600 flex-shrink-0" />
                    <span>{location}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sustainable Development */}
        <section>
          <Card className="shadow-md border-none bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700">{content.development.title}</h2>
              </div>
              <p className="text-slate-700 text-sm sm:text-base mb-4 sm:mb-6">{content.development.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {content.development.principles.map((principle, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm sm:text-base">{principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="shadow-md border-none bg-nafeza-50">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700 mb-4 sm:mb-6">{content.contact.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Email</div>
                    <a href={`mailto:${content.contact.email}`} className="text-nafeza-600 hover:underline text-xs sm:text-sm break-all">
                      {content.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Phone</div>
                    <a href={`tel:${content.contact.phone}`} className="text-nafeza-600 hover:underline text-xs sm:text-sm">
                      {content.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2 lg:col-span-1">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">Address</div>
                    <p className="text-slate-700 text-xs sm:text-sm">{content.contact.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

