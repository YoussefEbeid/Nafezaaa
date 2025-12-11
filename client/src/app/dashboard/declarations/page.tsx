'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAciList } from '@/features/aci/api/useAci';
import { FileText, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Date formatting helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function DeclarationsPage() {
  const router = useRouter();
  const { data: requests, isLoading } = useAciList();

  // Filter only approved/submitted declarations
  const declarations = requests?.filter(r => 
    r.status.toLowerCase() === 'approved' || 
    r.status.toLowerCase() === 'submitted'
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-nafeza-700">Declarations (46KM)</h1>
        <p className="text-slate-500 mt-1">View your submitted customs declarations</p>
      </div>

      {/* Declarations Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Recent Declarations</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-slate-500">Loading declarations...</div>
          ) : declarations.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <FileText className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-slate-500">No declarations found</p>
              <p className="text-sm text-slate-400">Submit an ACI request to create a declaration</p>
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">ACID Number</th>
                    <th className="px-6 py-3">Exporter</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {declarations.map((declaration) => (
                    <tr key={declaration.id} className="bg-white border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-nafeza-600 font-medium">
                        {declaration.acidNumber}
                      </td>
                      <td className="px-6 py-4">{declaration.exporterName}</td>
                      <td className="px-6 py-4">
                        {formatDate(declaration.requestDate)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${getStatusColor(declaration.status)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                          {declaration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/dashboard/aci/${declaration.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

