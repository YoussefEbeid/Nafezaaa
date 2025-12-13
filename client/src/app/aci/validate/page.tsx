'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CheckCircle, XCircle, Search, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AciValidatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    acidNumber: '',
    importerTaxId: '',
    exporterId: '', // Foreign Exporter No
    registryType: 'Commercial Registration', // Mock dropdown
    country: 'CN' // Mock dropdown
  });

  const handleVerify = async () => {
    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      // Call our new .NET Endpoint
      const response = await api.post('/aci/validate', {
        acidNumber: formData.acidNumber,
        importerTaxId: formData.importerTaxId,
        exporterId: formData.exporterId
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Validation Failed. Please check inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-nafeza-700 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">(ACI) Lock & Request Validator</h1>
          <p className="text-nafeza-200 mt-2">Check the ACID number and verify shipment data integrity.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: The Form */}
        <div className="md:col-span-2">
          <Card className="shadow-lg border-t-4 border-t-nafeza-600">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Search className="w-5 h-5 mr-2 text-nafeza-600" /> 
                Validate Shipment Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Result Area */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center animate-in fade-in">
                  <XCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Verification Failed</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {result?.valid && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg animate-in fade-in">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    <p className="font-bold text-lg">Valid ACID Number</p>
                  </div>
                  <div className="ml-9 text-sm space-y-1">
                    <p><span className="font-semibold">Importer:</span> {result.details.importer}</p>
                    <p><span className="font-semibold">Exporter:</span> {result.details.exporter}</p>
                    <p><span className="font-semibold">Status:</span> {result.details.status}</p>
                    <p><span className="font-semibold">Expires:</span> {result.details.expiryDate}</p>
                  </div>
                </div>
              )}

              {/* Inputs */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">ACID Number *</label>
                <Input 
                  placeholder="e.g. 2025-11-29-998877" 
                  value={formData.acidNumber}
                  onChange={(e) => setFormData({...formData, acidNumber: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Importer Tax ID *</label>
                <Input 
                  placeholder="e.g. 100-200-300" 
                  value={formData.importerTaxId}
                  onChange={(e) => setFormData({...formData, importerTaxId: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Foreign Exporter No (CargoX) *</label>
                    <Input 
                      placeholder="e.g. CX-99887766" 
                      value={formData.exporterId}
                      onChange={(e) => setFormData({...formData, exporterId: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Foreign Exporter Country</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                        <option value="CN">China</option>
                        <option value="DE">Germany</option>
                        <option value="US">United States</option>
                    </select>
                </div>
              </div>

              {/* Fake Captcha */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-md flex items-center w-fit">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mr-3" />
                <span className="text-sm text-slate-600">I'm not a robot</span>
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="h-8 ml-8 opacity-50" alt="captcha"/>
              </div>

              <Button 
                onClick={handleVerify} 
                isLoading={isLoading} 
                className="w-full md:w-auto bg-nafeza-600 hover:bg-nafeza-700"
              >
                Verify ACID
              </Button>

            </CardContent>
          </Card>
        </div>

        {/* Right: Info Panel */}
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">Ready to ship?</h3>
            <p className="text-sm text-yellow-700 mb-4">
              Shipping Lines and Freight Forwarders must verify the ACID No. before loading.
            </p>
            <div className="text-xs text-yellow-800 bg-yellow-100 p-3 rounded border border-yellow-200">
              Important: This service locks the ACID data preventing further modification by the Importer.
            </div>
          </div>

          <div className="bg-white border p-5 rounded-lg shadow-sm">
             <h3 className="font-bold text-slate-700 mb-3 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-600" /> Security Tip
             </h3>
             <p className="text-sm text-slate-500">
                Ensure the Exporter Name matches exactly what is listed on the Bill of Lading.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}