import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { generateMockData } from '@/lib/mock-data';
import {
  NetWorthData,
  BankTransaction,
  CreditReportData,
  EPFDetails,
  MutualFundTransaction,
  MutualFundHolding,
} from '@/lib/mcp-client';

// Query keys
export const queryKeys = {
  netWorth: (phone: string) => ['netWorth', phone] as const,
  transactions: (phone: string) => ['transactions', phone] as const,
  creditReport: (phone: string) => ['creditReport', phone] as const,
  epfDetails: (phone: string) => ['epfDetails', phone] as const,
  mfTransactions: (phone: string) => ['mfTransactions', phone] as const,
  holdings: (phone: string) => ['holdings', phone] as const,
};

// Hook to fetch Net Worth
export function useNetWorth() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.netWorth(user?.phone || ''),
    queryFn: () => {
      const data = generateMockData(user!.phone);
      return data.netWorth as NetWorthData;
    },
    enabled: !!user?.phone,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Hook to fetch Bank Transactions
export function useBankTransactions() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.transactions(user?.phone || ''),
    queryFn: () => {
      const data = generateMockData(user!.phone);
      return data.transactions as BankTransaction[];
    },
    enabled: !!user?.phone,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Hook to fetch Credit Report
export function useCreditReport() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.creditReport(user?.phone || ''),
    queryFn: () => {
      const data = generateMockData(user!.phone);
      return data.creditReport as CreditReportData;
    },
    enabled: !!user?.phone,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

// Hook to fetch EPF Details
export function useEpfDetails() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.epfDetails(user?.phone || ''),
    queryFn: () => {
      const data = generateMockData(user!.phone);
      return data.epfDetails as EPFDetails;
    },
    enabled: !!user?.phone,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

// Hook to fetch Mutual Fund Transactions
export function useMutualFundTransactions() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.mfTransactions(user?.phone || ''),
    queryFn: () => {
      const data = generateMockData(user!.phone);
      return data.mfTransactions as MutualFundTransaction[];
    },
    enabled: !!user?.phone,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Hook to calculate holdings from transactions
export function useMutualFundHoldings() {
  const { user } = useAuth();
  const mfQuery = useMutualFundTransactions();

  const holdings: MutualFundHolding[] = mfQuery.data
    ? calculateHoldingsFromTransactions(mfQuery.data)
    : [];

  return {
    ...mfQuery,
    data: holdings,
  };
}

function calculateHoldingsFromTransactions(transactions: MutualFundTransaction[]): MutualFundHolding[] {
  const holdingsMap = new Map<string, MutualFundHolding>();

  for (const tx of transactions) {
    const key = tx.scheme;
    const existing = holdingsMap.get(key);

    if (!existing) {
      holdingsMap.set(key, {
        name: tx.scheme,
        schemeCode: key.replace(/\s+/g, '_').toUpperCase(),
        platform: 'Unknown',
        invested: tx.type === 'purchase' || tx.type === 'sip' ? tx.amount : 0,
        currentValue: tx.type === 'purchase' || tx.type === 'sip' ? tx.amount : 0,
        returns: 0,
        units: tx.units,
        nav: tx.nav,
      });
    } else {
      if (tx.type === 'purchase' || tx.type === 'sip') {
        existing.invested += tx.amount;
        existing.currentValue += tx.amount;
        existing.units += tx.units;
      } else if (tx.type === 'redemption') {
        existing.invested = Math.max(0, existing.invested - tx.amount);
        existing.units = Math.max(0, existing.units - tx.units);
      }
    }
  }

  return Array.from(holdingsMap.values()).map(h => ({
    ...h,
    returns: h.invested > 0 ? ((h.currentValue - h.invested) / h.invested) * 100 : 0,
  }));
}

// Types for the combined user data
export interface UserDataResult {
  netWorth: NetWorthData | null;
  transactions: BankTransaction[] | null;
  creditReport: CreditReportData | null;
  epfDetails: EPFDetails | null;
  mfTransactions: MutualFundTransaction[] | null;
  holdings: MutualFundHolding[];
}