'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertCircle, Lock, User, ArrowLeft, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      login(response.data, response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid identifier or password. Try: Tax ID, Email, or CargoX ID');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nafeza-500 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

        <Card className="w-full max-w-md border-none shadow-2xl relative z-10">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-nafeza-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              N
            </div>
            <CardTitle className="text-2xl font-bold text-nafeza-700">Welcome Back</CardTitle>
            <p className="text-slate-500 text-sm">Sign in to manage your shipments</p>
          </CardHeader>

          <CardContent>
            {/* Success Message if coming from Register page */}
            {registered && (
              <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm flex items-center border border-green-200">
                <CheckCircle className="w-4 h-4 mr-2" />
                Account created! Please log in.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Tax ID / Email / CargoX ID</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Tax ID, Email, or CargoX ID" 
                    className="pl-10" 
                    value={formData.identifier}
                    onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Importer: Tax ID or Email | Exporter: Email or CargoX ID
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <Button className="w-full bg-nafeza-600 hover:bg-nafeza-700" size="lg" isLoading={isLoading}>
                Sign In
              </Button>
            </form>

            {/* --- NEW SECTION: CREATE ACCOUNT LINK --- */}
            <div className="mt-6 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">New to Nafeza?</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-nafeza-200 text-nafeza-700" onClick={() => router.push('/auth/register')}>
                Create an Account
              </Button>

              <button onClick={() => router.push('/')} className="text-sm text-slate-400 hover:text-nafeza-600 flex items-center justify-center mx-auto pt-2">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Homepage
              </button>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}