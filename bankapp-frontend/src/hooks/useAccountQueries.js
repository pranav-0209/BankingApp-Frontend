// Create hooks/useAccountQueries.js
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';

export const fetchAndSortAccounts = async () => {
    const { data } = await api.get('/account');
    if (!data) return [];
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const useAccounts = (userId) => {
    return useQuery({
        queryKey: ['accounts', userId],
        queryFn: fetchAndSortAccounts,
        enabled: !!userId,
    });
};

export const useAccountBalance = (accountNumber) => {
  return useQuery({
    queryKey: ['account', 'balance', accountNumber],
    queryFn: async () => {
      const { data } = await api.get(`/account/balance/${accountNumber}`);
      return data;
    },
    enabled: !!accountNumber,
    staleTime: 30 * 1000, // 30 seconds for balance data
  });
};

// Prefetch related data
export const usePrefetchTransactions = () => {
  const queryClient = useQueryClient();
  
  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ['transactions'],
      queryFn: () => api.get('/transaction').then(res => res.data),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  }, [queryClient]);
};