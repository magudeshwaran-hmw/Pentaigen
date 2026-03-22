// MCP Client for communicating with fi-mcp-dev server
// Uses JSON-RPC over Server-Sent Events (SSE)

const MCP_ENDPOINT = 'http://localhost:8080/mcp/stream';

export interface NetWorthData {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  breakdown: {
    savings: number;
    investments: number;
    epf: number;
    insurance: number;
    loans: number;
  };
  history: Array<{ month: string; value: number }>;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'completed' | 'flagged' | 'suspicious' | 'pending';
}

export interface CreditReportData {
  score: number;
  scoreHistory: Array<{ month: string; score: number }>;
  report: {
    totalAccounts: number;
    activeAccounts: number;
    closedAccounts: number;
    totalCredit: number;
    creditUtilization: number;
    paymentHistory: number;
  };
}

export interface EPFDetails {
  balance: number;
  employeeContribution: number;
  employerContribution: number;
  interestRate: number;
  totalContributions: number;
  interestEarned: number;
  uan: string;
  memberId: string;
}

export interface MutualFundHolding {
  name: string;
  schemeCode: string;
  platform: string;
  invested: number;
  currentValue: number;
  returns: number;
  units: number;
  nav: number;
}

export interface MutualFundTransaction {
  id: string;
  date: string;
  scheme: string;
  type: 'purchase' | 'redemption' | 'sip' | 'switch';
  amount: number;
  units: number;
  nav: number;
}

type JSONRPCResult = {
  jsonrpc: '2.0';
  id: number;
  result: unknown;
};

type JSONRPCError = {
  jsonrpc: '2.0';
  id: number;
  error: {
    code: number;
    message: string;
    data?: unknown;
  };
};

let requestId = 0;

async function callMCPTool(toolName: string, params: Record<string, unknown>): Promise<unknown> {
  const id = ++requestId;

  const request = {
    jsonrpc: '2.0',
    id,
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: params,
    },
  };

  const response = await fetch(MCP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`MCP request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if ('error' in data) {
    const error = data as JSONRPCError;
    throw new Error(`MCP error: ${error.error.message}`);
  }

  const result = data as JSONRPCResult;
  return result.result;
}

// Tool calling functions
export async function fetchNetWorth(phone: string): Promise<NetWorthData> {
  const result = await callMCPTool('fetchNetWorth', { phone });
  return result as NetWorthData;
}

export async function fetchBankTransactions(phone: string): Promise<BankTransaction[]> {
  const result = await callMCPTool('fetchBankTransactions', { phone });
  return result as BankTransaction[];
}

export async function fetchCreditReport(phone: string): Promise<CreditReportData> {
  const result = await callMCPTool('fetchCreditReport', { phone });
  return result as CreditReportData;
}

export async function fetchEpfDetails(phone: string): Promise<EPFDetails> {
  const result = await callMCPTool('fetchEpfDetails', { phone });
  return result as EPFDetails;
}

export async function fetchMutualFundTransactions(phone: string): Promise<MutualFundTransaction[]> {
  const result = await callMCPTool('fetchMutualFundTransactions', { phone });
  return result as MutualFundTransaction[];
}

// Helper to get holdings from transactions
export function calculateHoldings(transactions: MutualFundTransaction[]): MutualFundHolding[] {
  const holdingsMap = new Map<string, MutualFundHolding>();

  for (const tx of transactions) {
    const existing = holdingsMap.get(tx.scheme);
    if (!existing) {
      holdingsMap.set(tx.scheme, {
        name: tx.scheme,
        schemeCode: tx.scheme.replace(/\s+/g, '_').toUpperCase(),
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
        existing.invested -= tx.amount;
        existing.units -= tx.units;
      }
    }
  }

  const holdings = Array.from(holdingsMap.values());
  return holdings.map(h => ({
    ...h,
    returns: h.invested > 0 ? ((h.currentValue - h.invested) / h.invested) * 100 : 0,
  }));
}

// MCP Client class for more complex operations
export class MCPClient {
  private endpoint: string;

  constructor(endpoint: string = MCP_ENDPOINT) {
    this.endpoint = endpoint;
  }

  async callTool<T>(toolName: string, params: Record<string, unknown>): Promise<T> {
    const result = await callMCPTool(toolName, params);
    return result as T;
  }

  async fetchAllUserData(phone: string) {
    const [netWorth, transactions, creditReport, epfDetails, mfTransactions] = await Promise.allSettled([
      this.callTool<NetWorthData>('fetchNetWorth', { phone }),
      this.callTool<BankTransaction[]>('fetchBankTransactions', { phone }),
      this.callTool<CreditReportData>('fetchCreditReport', { phone }),
      this.callTool<EPFDetails>('fetchEpfDetails', { phone }),
      this.callTool<MutualFundTransaction[]>('fetchMutualFundTransactions', { phone }),
    ]);

    return {
      netWorth: netWorth.status === 'fulfilled' ? netWorth.value : null,
      transactions: transactions.status === 'fulfilled' ? transactions.value : null,
      creditReport: creditReport.status === 'fulfilled' ? creditReport.value : null,
      epfDetails: epfDetails.status === 'fulfilled' ? epfDetails.value : null,
      mfTransactions: mfTransactions.status === 'fulfilled' ? mfTransactions.value : null,
      holdings: mfTransactions.status === 'fulfilled' ? calculateHoldings(mfTransactions.value) : [],
    };
  }
}

export const mcpClient = new MCPClient();