'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertCircle, ShieldCheck, Usb, ArrowLeft, Info, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore, useAuthStore } from '@/lib/store';
import api from '@/lib/axios';

export default function TokenLoginPage() {
  const router = useRouter();
  const { t, language } = useTranslation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ 
    identifier: '',
    tokenPin: '', 
    certificatePassword: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // First, check if e-Token is connected
      const tokenCheck = await api.get('/auth/check-etoken');
      
      if (tokenCheck.data.Status !== 'Connected') {
        setError(t('tokenLogin.tokenNotConnected'));
        setIsLoading(false);
        return;
      }

      // Validate identifier is provided
      if (!formData.identifier || formData.identifier.trim().length === 0) {
        setError(t('tokenLogin.identifierRequired'));
        setIsLoading(false);
        return;
      }

      // Call the token login API
      const response = await api.post('/auth/token-login', {
        identifier: formData.identifier.trim(),
        tokenPin: formData.tokenPin,
        certificatePassword: formData.certificatePassword
      });

      // Login successful - store token and user data
      const { login } = useAuthStore.getState();
      login(response.data, response.data.token);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || t('tokenLogin.authenticationFailed');
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nafeza-500 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <Card className="w-full max-w-md border-none shadow-2xl relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-nafeza-700 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-nafeza-700">{t('tokenLogin.eSignatureLogin')}</CardTitle>
          <p className="text-slate-500 text-sm mt-2">{t('tokenLogin.secureTokenAuthentication')}</p>
        </CardHeader>

        <CardContent>
          {/* Success Message */}
          {success && (
            <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm flex items-center border border-green-200">
              <CheckCircle className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('tokenLogin.authenticationSuccess')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-center">
                <AlertCircle className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {error}
              </div>
            )}

            {/* Token USB Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
              <Usb className={`w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 mb-1">{t('tokenLogin.insertEToken')}</p>
                <p className="text-xs text-blue-700">{t('tokenLogin.insertETokenDesc')}</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">{t('tokenLogin.identifier')}</label>
              <Input 
                type="text" 
                placeholder={t('tokenLogin.identifierPlaceholder')} 
                value={formData.identifier || ''}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                {t('tokenLogin.identifierHint')}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">{t('tokenLogin.tokenPin')}</label>
              <Input 
                type="password" 
                placeholder={t('tokenLogin.tokenPinPlaceholder')} 
                value={formData.tokenPin}
                onChange={(e) => setFormData({...formData, tokenPin: e.target.value})}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                {t('tokenLogin.tokenPinHint')}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">{t('tokenLogin.certificatePassword')}</label>
              <Input 
                type="password" 
                placeholder={t('tokenLogin.certificatePasswordPlaceholder')} 
                value={formData.certificatePassword}
                onChange={(e) => setFormData({...formData, certificatePassword: e.target.value})}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                {t('tokenLogin.certificatePasswordHint')}
              </p>
            </div>

            <Button 
              className="w-full bg-nafeza-600 hover:bg-nafeza-700" 
              size="lg" 
              isLoading={isLoading}
              disabled={!formData.identifier || !formData.tokenPin || !formData.certificatePassword}
            >
              {t('tokenLogin.signInWithToken')}
            </Button>
          </form>

          {/* Information Section */}
          <div className="mt-6 space-y-3">
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <Info className={`w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-700 mb-1">{t('tokenLogin.important')}</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>{t('tokenLogin.importantPoint1')}</li>
                    <li>{t('tokenLogin.importantPoint2')}</li>
                    <li>{t('tokenLogin.importantPoint3')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <button 
                onClick={() => router.push('/auth/login')} 
                className="text-sm text-slate-500 hover:text-nafeza-600 transition-colors"
              >
                {t('tokenLogin.useRegularLogin')}
              </button>
              
              <div className="border-t border-slate-200"></div>
              
              <button 
                onClick={() => router.push('/')} 
                className="text-sm text-slate-400 hover:text-nafeza-600 flex items-center justify-center mx-auto"
              >
                <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'ml-1 rotate-180' : 'mr-1'}`} /> 
                {t('tokenLogin.backToHomepage')}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

