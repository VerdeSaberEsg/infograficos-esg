import axios from 'axios';
import { LookupResponse } from './types';

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const lookupCnpj = async (cnpj: string): Promise<LookupResponse> => {
  const response = await client.get<LookupResponse>(`/lookup/${cnpj}`);
  return response.data;
};

export const exportJson = async (cnpj: string): Promise<Blob> => {
  const response = await client.get(`/export/json/${cnpj}`, {
    responseType: 'blob'
  });
  return response.data;
};

export const exportPdf = async (cnpj: string): Promise<Blob> => {
  const response = await client.get(`/export/pdf/${cnpj}`, {
    responseType: 'blob'
  });
  return response.data;
};
