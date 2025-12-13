'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Building2, Globe, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [accountType, setAccountType] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    taxId: '',
    cargoXId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. Password Check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // 2. Importer Validation (Must be 9 digits)
    if (accountType === 1) {
      const taxIdRegex = /^\d{9}$/;
      // Removing dashes if user typed 100-200-300
      const cleanTaxId = formData.taxId.replace(/-/g, '');
      
      if (!taxIdRegex.test(cleanTaxId)) {
        setError("Tax ID must be exactly 9 digits (e.g. 100200300).");
        setIsLoading(false);
        return;
      }
    }

    // 3. Exporter Validation (Must start with CX)
    if (accountType === 2) {
      if (!formData.cargoXId.toUpperCase().startsWith('CX')) {
        setError("CargoX ID must start with 'CX' (e.g. CX-123456).");
        setIsLoading(false);
        return;
      }
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: accountType,
        taxId: accountType === 1 ? formData.taxId : null,
        cargoXId: accountType === 2 ? formData.cargoXId : null
      };

      await api.post('/auth/register', payload);
      router.push('/auth/login?registered=true');
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nafeza-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none shadow-2xl">
        <CardHeader className="text-center pb-2">
           <h2 className="text-2xl font-bold text-nafeza-700">Create Account</h2>
           <p className="text-slate-500 text-sm">Join the National Single Window</p>
        </CardHeader>
        <CardContent>
          
          <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setAccountType(1)}
              className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${
                accountType === 1 ? 'bg-white text-nafeza-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Egyptian Importer
            </button>
            <button
              type="button"
              onClick={() => setAccountType(2)}
              className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${
                accountType === 2 ? 'bg-white text-nafeza-accent shadow-sm' : 'text-slate-500'
              }`}
            >
              <Globe className="w-4 h-4 mr-2" />
              Foreign Exporter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Company Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input className="pl-10" placeholder="e.g. Acme Corp" required 
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input className="pl-10" type="email" placeholder="info@company.com" required 
                             value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">
                    {accountType === 1 ? "Tax Registration ID" : "CargoX Blockchain ID"}
                </label>
                <div className="relative">
                    {accountType === 1 ? <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /> : <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />}
                    <Input 
                        className="pl-10" 
                        placeholder={accountType === 1 ? "e.g. 100200300" : "e.g. CX-99887766"} 
                        required 
                        value={accountType === 1 ? formData.taxId : formData.cargoXId}
                        onChange={e => {
                            if(accountType === 1) setFormData({...formData, taxId: e.target.value});
                            else setFormData({...formData, cargoXId: e.target.value});
                        }}
                    />
                </div>
                <p className="text-xs text-slate-400">
                    {accountType === 1 
                        ? "Must be exactly 9 digits." 
                        : "Must start with 'CX' (e.g. CX-12345)."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input className="pl-10" type="password" placeholder="••••••••" required 
                             value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input className="pl-10" type="password" placeholder="••••••••" required 
                             value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                    </div>
                </div>
            </div>

            <Button className="w-full bg-nafeza-600 hover:bg-nafeza-700 mt-4" size="lg" isLoading={isLoading}>
                Create Account
            </Button>
          </form>

          <div className="mt-6 text-center border-t pt-4">
            <p className="text-sm text-slate-500">
                Already registered? <button onClick={() => router.push('/auth/login')} className="text-nafeza-600 font-bold hover:underline">Sign In</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}