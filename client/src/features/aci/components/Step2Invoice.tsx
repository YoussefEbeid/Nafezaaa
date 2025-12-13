import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { useUploadInvoice, UploadResponse } from '../api/useAci';
import { formatCurrency } from '@/lib/utils';

interface Props {
  requestId: number;
  onNext: () => void;
  onBack?: () => void;
}

export function Step2Invoice({ requestId, onNext, onBack }: Props) {
  const { mutate: upload, isPending } = useUploadInvoice();
  const [data, setData] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error and data
    setError(null);
    setData(null);

    // Call API to upload/parse
    upload({ id: requestId, file }, {
      onSuccess: (res) => {
        // Map the response to match the expected structure
        const mappedData: UploadResponse = {
          message: res.message || 'Success',
          totalLines: res.totalLines || res.TotalLines || 0,
          totalValueUSD: res.totalValueUSD || res.TotalValueUSD || 0,
          items: (res.items || res.Items || []).map((item: any) => ({
            hsCode: item.hsCode || item.HSCode || '',
            description: item.description || item.Description || '',
            quantity: item.quantity || item.Quantity || 0,
            value: item.value || item.Value || 0,
          })),
        };
        setData(mappedData);
      },
      onError: (err: any) => {
        // Try to extract a meaningful error message from the response
        let errorMessage = 'Failed to upload file. Please try again.';
        
        if (err.response?.data) {
          // Check for different possible error formats
          if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.data.title) {
            errorMessage = err.response.data.title;
          } else if (err.response.data.error) {
            errorMessage = err.response.data.error;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
        console.error('Upload error:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          message: err.message,
          fullError: err
        });
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center text-red-800">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Box */}
      {!data && (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {isPending ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> : <UploadCloud className="h-8 w-8" />}
          </div>
          <h3 className="text-xl font-semibold text-slate-700">Upload Commercial Invoice</h3>
          <p className="text-slate-500 mt-2 mb-4">Support for Excel (.xlsx) or CSV</p>
          
          {/* Format Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-2xl mx-auto mb-6">
            <h4 className="font-semibold text-blue-900 mb-2 text-sm">Expected Excel Format:</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Column 1:</strong> HS Code (at least 4 digits, e.g., "851713")</p>
              <p><strong>Column 2:</strong> Description (product description)</p>
              <p><strong>Column 3:</strong> Quantity (positive number)</p>
              <p><strong>Column 4:</strong> Unit Price (optional, can be 0)</p>
              <p><strong>Column 5:</strong> Weight in kg (optional, defaults to 0)</p>
              <p className="mt-2 text-blue-700"><em>Note: First row should be headers, data starts from row 2</em></p>
            </div>
          </div>
          
          <div className="relative inline-block">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              disabled={isPending}
            />
            <Button variant="outline" disabled={isPending}>
              {isPending ? 'Uploading...' : 'Select File'}
            </Button>
          </div>
        </div>
      )}

      {/* Data Preview (Shows only after upload) */}
      {data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-2" />
            Successfully extracted {data.totalLines} items with total value {formatCurrency(data.totalValueUSD, 'USD')}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-600 font-medium">
                <tr>
                  <th className="px-4 py-3">HS Code</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3 text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.items.map((item, i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-4 py-3 font-mono text-blue-600">{item.hsCode}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(item.value, 'USD')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between gap-2">
            <div>
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  ← Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => {
                setData(null);
                setError(null);
              }}>Re-upload</Button>
              <Button onClick={onNext}>Confirm & Continue</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}