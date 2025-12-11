'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Building2, Mail, Hash, Globe, Save } from 'lucide-react';
import api from '@/lib/axios';

interface ProfileData {
  id: number;
  name: string;
  email: string;
  taxId?: string;
  cargoXId?: string;
  type: string;
}

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    taxId: '',
    cargoXId: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setProfile(res.data);
      setFormData({
        name: res.data.name || '',
        email: res.data.email || '',
        taxId: res.data.taxId || '',
        cargoXId: res.data.cargoXId || '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, you'd have an update endpoint
      // For now, we'll just show a message
      alert('Profile update functionality would be implemented here');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-nafeza-700">Company Profile</h1>
        <div className="text-center py-10 text-slate-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-nafeza-700">Company Profile</h1>
        <p className="text-slate-500 mt-1">Manage your company information</p>
      </div>

      {/* Profile Card */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                <Building2 className="h-4 w-4 mr-2 text-nafeza-600" />
                Company Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter company name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                <Mail className="h-4 w-4 mr-2 text-nafeza-600" />
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>

            {/* Tax ID (for Importers) */}
            {profile?.type === 'Importer' && (
              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <Hash className="h-4 w-4 mr-2 text-nafeza-600" />
                  Tax Registration ID
                </label>
                <Input
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  placeholder="Enter tax ID"
                />
              </div>
            )}

            {/* CargoX ID (for Exporters) */}
            {profile?.type === 'ForeignExporter' && (
              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                  <Globe className="h-4 w-4 mr-2 text-nafeza-600" />
                  CargoX Blockchain ID
                </label>
                <Input
                  value={formData.cargoXId}
                  onChange={(e) => setFormData({ ...formData, cargoXId: e.target.value })}
                  placeholder="Enter CargoX ID"
                />
              </div>
            )}

            {/* Company Type */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Company Type</label>
              <div className="px-4 py-3 bg-slate-50 rounded-md border border-slate-200">
                <span className="text-slate-700 font-medium">{profile?.type}</span>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSave} isLoading={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

