export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
export const portfolio = [420000, 435000, 428000, 452000, 448000, 465000, 468200];
export const invested = [380000, 390000, 400000, 410000, 420000, 430000, 440000];
export const spend25 = [42000, 38000, 51000, 44000, 48000, 55000, 47000];
export const spend24 = [38000, 42000, 45000, 40000, 43000, 48000, 44000];
export const nwTrend = [980000, 1050000, 1120000, 1180000, 1230000, 1247850];
export const liab = [580000, 570000, 560000, 550000, 545000, 540000];
export const quarters = ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25'];
export const sipData = [100, 118, 112, 134, 148, 162];
export const niftyData = [100, 121, 110, 130, 140, 155];
export const agentActivity = [42, 67, 38, 92, 55, 28];
export const agentLabels = ['Wealth', 'Tax', 'Portfolio', 'Anomaly', 'Coach', 'AutoPilot'];
export const creditHistory = [742, 751, 758, 765, 771, 780, 792];
export const creditMonths = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Jan 25'];
export const taxUsed = [95000, 0, 12000, 120000, 60000];
export const taxLeft = [55000, 50000, 13000, 80000, 0];
export const taxSections = ['80C', '80CCD', '80D', '24B', 'HRA'];
export const breakdown = [247850, 468200, 312400, 300000, -540000];
export const bkLabels = ['Savings', 'Invest', 'EPF', 'Insurance', 'Loan'];

export const formatCurrency = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `${(value / 100000).toFixed(2)} L`;
  if (abs >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString('en-IN');
};

export const formatFullCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export const agents = [
  { name: 'Wealth Strategist', gradient: ['#1e3a8a', '#2563eb'], icon: 'Shield', status: 'Online' as const },
  { name: 'Tax Optimizer', gradient: ['#065f46', '#00a87c'], icon: 'FileText', status: 'Online' as const },
  { name: 'Portfolio Manager', gradient: ['#5b21b6', '#7c3aed'], icon: 'TrendingUp', status: 'Online' as const },
  { name: 'Anomaly Watchdog', gradient: ['#7f1d1d', '#dc2626'], icon: 'AlertTriangle', status: 'Online' as const },
  { name: 'Behavioral Coach', gradient: ['#78350f', '#d97706'], icon: 'Heart', status: 'Online' as const },
  { name: 'Simulation Engine', gradient: ['#0c4a6e', '#0284c7'], icon: 'Clock', status: 'Online' as const },
  { name: 'Credit Optimizer', gradient: ['#1e3a8a', '#2563eb'], icon: 'CreditCard', status: 'Online' as const },
  { name: 'Consent Governor', gradient: ['#065f46', '#00a87c'], icon: 'ShieldCheck', status: 'Online' as const },
  { name: 'Doc Intelligence', gradient: ['#5b21b6', '#7c3aed'], icon: 'FileSearch', status: 'Standby' as const },
  { name: 'Smart Marketplace', gradient: ['#7f1d1d', '#dc2626'], icon: 'ShoppingBag', status: 'Online' as const },
  { name: 'Conversational AI', gradient: ['#78350f', '#d97706'], icon: 'MessageSquare', status: 'Online' as const },
  { name: 'AutoPilot', gradient: ['#0c4a6e', '#0284c7'], icon: 'Zap', status: 'Online' as const },
];

export const platforms = [
  { name: 'Fi Money', connected: true, color: '#00c896' },
  { name: 'Zerodha', connected: true, color: '#387ed1' },
  { name: 'Groww', connected: true, color: '#00b386' },
  { name: 'HDFC Bank', connected: true, color: '#004c8c' },
  { name: 'Federal Bank', connected: true, color: '#b22222' },
  { name: 'Paytm', connected: false, color: '#00baf2' },
  { name: 'PhonePe', connected: false, color: '#1d3191' },
  { name: 'Google Pay', connected: false, color: '#4285f4' },
  { name: 'BharatPe', connected: false, color: '#f5a623' },
  { name: 'Upstox', connected: false, color: '#7239ea' },
  { name: 'Jupiter', connected: false, color: '#3e31c1' },
  { name: 'Walnut', connected: false, color: '#d35400' },
  { name: 'Money View', connected: false, color: '#27ae60' },
  { name: 'MoneyTap', connected: false, color: '#e74c3c' },
  { name: 'KreditBee', connected: false, color: '#8e44ad' },
  { name: 'PolicyBazaar', connected: false, color: '#e67e22' },
  { name: 'ClearTax', connected: false, color: '#2980b9' },
];

export const transactions = [
  { name: 'Swiggy Food Order', date: '15 Mar 2025', category: 'Food', amount: -450, status: 'completed' as const },
  { name: 'Salary Credit — Acme Corp', date: '01 Mar 2025', category: 'Income', amount: 85000, status: 'completed' as const },
  { name: 'LMN Services', date: '12 Mar 2025', category: 'Unknown', amount: -78000, status: 'flagged' as const },
  { name: 'SIP — Mirae Asset', date: '05 Mar 2025', category: 'Investment', amount: -5000, status: 'completed' as const },
  { name: 'Amazon Shopping', date: '10 Mar 2025', category: 'Shopping', amount: -2340, status: 'completed' as const },
  { name: 'XYZ Online Shop', date: '08 Mar 2025', category: 'Shopping', amount: -25000, status: 'suspicious' as const },
  { name: 'Electricity Bill — BESCOM', date: '03 Mar 2025', category: 'Utilities', amount: -1850, status: 'completed' as const },
];

export const holdings = [
  { name: 'Mirae Asset Large Cap', platform: 'Groww', invested: 120000, current: 137040, returns: 14.2 },
  { name: 'Axis Bluechip Fund', platform: 'Zerodha', invested: 100000, current: 111800, returns: 11.8 },
  { name: 'HDFC Mid Cap Opp.', platform: 'Groww', invested: 80000, current: 91200, returns: 14.0 },
  { name: 'Nippon Gold ETF', platform: 'Zerodha', invested: 50000, current: 48950, returns: -2.1 },
  { name: 'SBI Small Cap Fund', platform: 'Fi Money', invested: 90000, current: 99210, returns: 10.2 },
];

export const assetAllocation = [
  { name: 'Equity', value: 55, color: '#2563eb' },
  { name: 'Debt', value: 20, color: '#00a87c' },
  { name: 'Gold', value: 10, color: '#d97706' },
  { name: 'Real Estate', value: 10, color: '#7c3aed' },
  { name: 'Cash', value: 5, color: '#52527a' },
];

export const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: '#fff',
    borderColor: '#e2e5f2',
    borderWidth: 1,
    borderRadius: 8,
    padding: '8px 12px',
    boxShadow: '0 4px 16px rgba(0,0,0,.09)',
  },
  labelStyle: { color: '#08080f', fontWeight: 600, fontFamily: "'Geist', sans-serif" },
  itemStyle: { color: '#52527a', fontFamily: "'Geist', sans-serif" },
};
