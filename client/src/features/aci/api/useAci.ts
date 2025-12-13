import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

// --- Types ---
export interface CreateAciParams {
  importerId: number;
  exporterId: number;
}

export interface InvoiceItem {
  hsCode: string;
  description: string;
  quantity: number;
  value: number;
}

export interface UploadResponse {
  message: string;
  totalLines: number;
  totalValueUSD: number;
  items: InvoiceItem[];
}

export interface AcidRequestDto {
  id: number;
  acidNumber: string;
  importerName: string;
  exporterName: string;
  status: string;
  requestDate: string;
  itemCount: number;
}

// --- Hooks ---

export const useCreateDraft = () => {
  return useMutation({
    mutationFn: async (data: CreateAciParams) => {
      const res = await api.post('/aci/draft', data);
      return res.data; // Returns { requestId: 123 }
    },
  });
};

export const useUploadInvoice = () => {
  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      
      // Don't set Content-Type header - axios interceptor will handle it
      // The browser needs to set multipart/form-data with boundary automatically
      const res = await api.post(`/aci/${id}/upload-invoice`, formData);
      return res.data as UploadResponse;
    },
  });
};

export const useSubmitAci = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post(`/aci/${id}/submit`);
      return res.data;
    },
  });
};

export const useAciList = () => {
  return useQuery({
    queryKey: ['aci-list'],
    queryFn: async () => {
      const res = await api.get('/aci/list');
      return res.data as AcidRequestDto[];
    },
  });
};