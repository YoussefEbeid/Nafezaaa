import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Building2, Globe, Search, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '@/lib/axios';

interface Props {
  onNext: (data: { importerId: number; exporterId: number }) => void;
  isLoading: boolean;
  onBack?: () => void;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  taxId?: string;
  cargoXId?: string;
  type: string;
}

interface Exporter {
  id: number;
  name: string;
  cargoXId?: string;
  email: string;
}

interface Importer {
  id: number;
  name: string;
  taxId?: string;
  email: string;
}

export function Step1Parties({ onNext, isLoading, onBack }: Props) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [counterpartySearch, setCounterpartySearch] = useState('');
  const [selectedCounterparty, setSelectedCounterparty] = useState<Exporter | Importer | null>(null);
  const [counterpartyResults, setCounterpartyResults] = useState<(Exporter | Importer)[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Determine user role and counterparty type
  const isExporter = userProfile?.type === 'ForeignExporter';
  const isImporter = userProfile?.type === 'Importer';
  const counterpartyType = isExporter ? 'Importer' : 'Exporter';

  // Fetch current user's profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUserProfile(res.data);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Search for counterparty (exporters or importers based on user type)
  useEffect(() => {
    // Don't search if profile is still loading
    if (profileLoading || !userProfile) return;

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const query = counterpartySearch.trim();
        const endpoint = isExporter 
          ? '/aci/importers/search' 
          : '/aci/exporters/search';
        
        const res = await api.get(endpoint, {
          params: query ? { query } : {}
        });
        setCounterpartyResults(res.data || []);
        // Only show results if there's a search query or if we have results
        if (query || res.data?.length > 0) {
          setShowResults(true);
        } else {
          setShowResults(false);
        }
      } catch (error) {
        console.error(`Failed to search ${counterpartyType.toLowerCase()}s:`, error);
        setCounterpartyResults([]);
        setShowResults(false);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [counterpartySearch, profileLoading, userProfile, isExporter, counterpartyType]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCounterpartySelect = (counterparty: Exporter | Importer) => {
    setSelectedCounterparty(counterparty);
    if ('cargoXId' in counterparty && counterparty.cargoXId) {
      setCounterpartySearch(counterparty.cargoXId || counterparty.name);
    } else if ('taxId' in counterparty && counterparty.taxId) {
      setCounterpartySearch(counterparty.taxId || counterparty.name);
    } else {
      setCounterpartySearch(counterparty.name);
    }
    setShowResults(false);
  };

  const handleSubmit = () => {
    if (!userProfile || !selectedCounterparty) {
      alert(`Please select a ${counterpartyType.toLowerCase()}`);
      return;
    }
    
    // Determine IDs based on user role
    if (isExporter) {
      // User is Exporter, so they are the exporter, selected counterparty is the importer
      onNext({ exporterId: userProfile.id, importerId: selectedCounterparty.id });
    } else if (isImporter) {
      // User is Importer, so they are the importer, selected counterparty is the exporter
      onNext({ importerId: userProfile.id, exporterId: selectedCounterparty.id });
    }
  };

  // Don't render until we know the user type
  if (profileLoading || !userProfile) {
    return (
      <div className="space-y-6">
        <div className="text-center py-10 text-slate-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current User Card (Exporter or Importer) */}
        <Card className="border-l-4 border-l-nafeza-600">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              {isExporter ? (
                <Globe className="h-6 w-6 text-nafeza-600 mr-2" />
              ) : (
                <Building2 className="h-6 w-6 text-nafeza-600 mr-2" />
              )}
              <h3 className="font-semibold text-lg">
                {isExporter ? 'Exporter (You)' : 'Importer (You)'}
              </h3>
            </div>
            <div className="space-y-4">
              {isExporter ? (
                <>
                  <Input 
                    label="CargoX Blockchain ID" 
                    value={userProfile?.cargoXId || 'N/A'} 
                    disabled 
                  />
                  <Input 
                    label="Company Name" 
                    value={userProfile?.name || 'N/A'} 
                    disabled 
                  />
                </>
              ) : (
                <>
                  <Input 
                    label="Tax Registration ID" 
                    value={userProfile?.taxId || 'N/A'} 
                    disabled 
                  />
                  <Input 
                    label="Company Name" 
                    value={userProfile?.name || 'N/A'} 
                    disabled 
                  />
                </>
              )}
              <p className="text-xs text-green-600">✓ Verified Entity</p>
            </div>
          </CardContent>
        </Card>

        {/* Counterparty Card (Importer or Exporter to search) */}
        <Card className="border-l-4 border-l-nafeza-accent">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              {isExporter ? (
                <Building2 className="h-6 w-6 text-nafeza-accent mr-2" />
              ) : (
                <Globe className="h-6 w-6 text-nafeza-accent mr-2" />
              )}
              <h3 className="font-semibold text-lg">
                {isExporter ? 'Importer' : 'Foreign Exporter'}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="relative" ref={resultsRef}>
                <div className="relative">
                  <div className="relative">
                    <Input 
                      label={isExporter ? 'Tax Registration ID or Name' : 'CargoX Blockchain ID or Name'} 
                      value={counterpartySearch} 
                      onChange={(e) => {
                        setCounterpartySearch(e.target.value);
                        setSelectedCounterparty(null);
                      }}
                      placeholder={isExporter ? 'Search by Tax ID or name...' : 'Search by CargoX ID or name...'}
                      className="pr-10"
                    />
                    <div className="absolute right-3 bottom-2.5 text-slate-400 pointer-events-none">
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Search Results Dropdown */}
                {showResults && counterpartyResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {counterpartyResults.map((counterparty) => (
                      <button
                        key={counterparty.id}
                        type="button"
                        onClick={() => handleCounterpartySelect(counterparty)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-slate-900">{counterparty.name}</div>
                        <div className="text-sm text-slate-500">
                          {'cargoXId' in counterparty && counterparty.cargoXId && `CargoX: ${counterparty.cargoXId}`}
                          {'taxId' in counterparty && counterparty.taxId && `Tax ID: ${counterparty.taxId}`}
                          {counterparty.email && (
                            <>
                              {('cargoXId' in counterparty && counterparty.cargoXId) || ('taxId' in counterparty && counterparty.taxId) ? ' • ' : ''}
                              {counterparty.email}
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Input 
                label={`${counterpartyType} Name`} 
                value={selectedCounterparty?.name || ''} 
                disabled 
                placeholder={`Select a ${counterpartyType.toLowerCase()} above`}
              />
              
              {selectedCounterparty ? (
                <p className="text-xs text-green-600">
                  ✓ {isExporter ? 'Found Importer' : 'Found on CargoX Network'}
                </p>
              ) : counterpartySearch && !isSearching && counterpartyResults.length === 0 ? (
                <p className="text-xs text-orange-600">
                  ⚠ No {counterpartyType.toLowerCase()} found. Please check the {isExporter ? 'Tax ID' : 'CargoX ID'} or name.
                </p>
              ) : (
                <p className="text-xs text-blue-600">
                  ℹ Search for a {counterpartyType.toLowerCase()} by {isExporter ? 'Tax ID' : 'CargoX ID'} or name
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        )}
        <div className={onBack ? "ml-auto" : ""}>
          <Button 
            size="lg" 
            onClick={handleSubmit}
            isLoading={isLoading || profileLoading}
            disabled={!userProfile || profileLoading || !selectedCounterparty}
          >
            Create Draft & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
