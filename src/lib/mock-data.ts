// Mock data generator based on phone number
// This provides different data for each test phone number without needing the MCP server

import { NetWorthData, BankTransaction, CreditReportData, EPFDetails, MutualFundTransaction, MutualFundHolding } from './mcp-client';

export function generateMockData(phone: string): {
  netWorth: NetWorthData;
  transactions: BankTransaction[];
  creditReport: CreditReportData;
  epfDetails: EPFDetails;
  mfTransactions: MutualFundTransaction[];
  holdings: MutualFundHolding[];
} {
  const phoneNum = parseInt(phone);

  // Different scenarios based on phone number
  switch (phoneNum) {
    case 1111111111: // No assets connected
      return generateNoAssetsData();
    case 2222222222: // All assets, large MF portfolio
      return generateLargeMfData();
    case 3333333333: // All assets, small MF portfolio
      return generateSmallMfData();
    case 7777777777: // Debt-heavy, low performer
      return generateDebtHeavyData();
    case 8888888888: // SIP Samurai
      return generateSipSamuraiData();
    case 9999999999: // Fixed Income Fanatic
      return generateFixedIncomeData();
    default:
      return generateDefaultData();
  }
}

function generateNoAssetsData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 50000,
      totalLiabilities: 0,
      netWorth: 50000,
      breakdown: { savings: 50000, investments: 0, epf: 0, insurance: 0, loans: 0 },
      history: [
        { month: 'Jan', value: 45000 }, { month: 'Feb', value: 48000 },
        { month: 'Mar', value: 50000 }, { month: 'Apr', value: 52000 },
        { month: 'May', value: 51000 }, { month: 'Jun', value: 50000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary Credit', category: 'Income', amount: 35000, status: 'completed' },
      { id: '2', date: '10 Mar 2026', description: 'Rent Payment', category: 'Housing', amount: -12000, status: 'completed' },
      { id: '3', date: '05 Mar 2026', description: 'Grocery Store', category: 'Food', amount: -3500, status: 'completed' },
      { id: '4', date: '01 Mar 2026', description: 'Mobile Recharge', category: 'Utilities', amount: -599, status: 'completed' },
    ],
    creditReport: {
      score: 680,
      scoreHistory: [
        { month: 'Jan', score: 650 }, { month: 'Mar', score: 665 },
        { month: 'May', score: 670 }, { month: 'Jul', score: 675 },
      ],
      report: { totalAccounts: 2, activeAccounts: 1, closedAccounts: 1, totalCredit: 50000, creditUtilization: 20, paymentHistory: 85 }
    },
    epfDetails: { balance: 0, employeeContribution: 0, employerContribution: 0, interestRate: 8.25, totalContributions: 0, interestEarned: 0, uan: 'NA', memberId: 'NA' },
    mfTransactions: [],
    holdings: []
  };
}

function generateLargeMfData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 4500000,
      totalLiabilities: 2800000,
      netWorth: 1700000,
      breakdown: { savings: 450000, investments: 2800000, epf: 850000, insurance: 200000, loans: 2800000 },
      history: [
        { month: 'Jan', value: 1580000 }, { month: 'Feb', value: 1610000 },
        { month: 'Mar', value: 1645000 }, { month: 'Apr', value: 1620000 },
        { month: 'May', value: 1670000 }, { month: 'Jun', value: 1700000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary Credit - Tech Corp', category: 'Income', amount: 185000, status: 'completed' },
      { id: '2', date: '12 Mar 2026', description: 'SIP - Mirae Asset', category: 'Investment', amount: -25000, status: 'completed' },
      { id: '3', date: '10 Mar 2026', description: 'Home Loan EMI', category: 'EMI', amount: -45000, status: 'completed' },
      { id: '4', date: '08 Mar 2026', description: 'Credit Card Payment', category: 'Credit Card', amount: -35000, status: 'completed' },
      { id: '5', date: '05 Mar 2026', description: 'Stock Dividend', category: 'Income', amount: 15000, status: 'completed' },
      { id: '6', date: '01 Mar 2026', description: 'Unknown Transfer', category: 'Unknown', amount: -78000, status: 'flagged' },
    ],
    creditReport: {
      score: 820,
      scoreHistory: [
        { month: 'Jan', score: 790 }, { month: 'Mar', score: 800 },
        { month: 'May', score: 810 }, { month: 'Jul', score: 815 },
        { month: 'Sep', score: 818 }, { month: 'Nov', score: 820 },
      ],
      report: { totalAccounts: 12, activeAccounts: 8, closedAccounts: 4, totalCredit: 4500000, creditUtilization: 25, paymentHistory: 98 }
    },
    epfDetails: { balance: 850000, employeeContribution: 425000, employerContribution: 425000, interestRate: 8.25, totalContributions: 850000, interestEarned: 125000, uan: '123456789012', memberId: 'TG/BNG/123456' },
    mfTransactions: [
      { id: '1', date: '2025-12-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 25000, units: 145.23, nav: 172.1 },
      { id: '2', date: '2026-01-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 25000, units: 142.15, nav: 175.9 },
      { id: '3', date: '2026-02-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 25000, units: 138.42, nav: 180.6 },
      { id: '4', date: '2026-03-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 25000, units: 135.87, nav: 184.0 },
      { id: '5', date: '2025-12-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 15000, units: 52.18, nav: 287.5 },
      { id: '6', date: '2026-01-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 15000, units: 50.92, nav: 294.6 },
      { id: '7', date: '2026-02-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 15000, units: 49.12, nav: 305.4 },
      { id: '8', date: '2026-03-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 15000, units: 47.85, nav: 313.5 },
    ],
    holdings: [
      { name: 'Mirae Asset Large Cap', schemeCode: 'MIRAE_LARGE_CAP', platform: 'Groww', invested: 100000, currentValue: 116340, returns: 16.34, units: 632.67, nav: 184.0 },
      { name: 'Axis Bluechip Fund', schemeCode: 'AXIS_BLUECHIP', platform: 'Zerodha', invested: 60000, currentValue: 68770, returns: 14.62, units: 219.27, nav: 313.5 },
      { name: 'HDFC Mid Cap Opp.', schemeCode: 'HDFC_MID_CAP', platform: 'Groww', invested: 80000, currentValue: 92480, returns: 15.6, units: 312.45, nav: 296.1 },
      { name: 'Nippon Gold ETF', schemeCode: 'NIPPON_GOLD', platform: 'Zerodha', invested: 50000, currentValue: 51200, returns: 2.4, units: 320.0, nav: 160.0 },
    ]
  };
}

function generateSmallMfData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 850000,
      totalLiabilities: 450000,
      netWorth: 400000,
      breakdown: { savings: 150000, investments: 350000, epf: 250000, insurance: 50000, loans: 450000 },
      history: [
        { month: 'Jan', value: 350000 }, { month: 'Feb', value: 365000 },
        { month: 'Mar', value: 380000 }, { month: 'Apr', value: 375000 },
        { month: 'May', value: 390000 }, { month: 'Jun', value: 400000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary Credit - Startup', category: 'Income', amount: 65000, status: 'completed' },
      { id: '2', date: '10 Mar 2026', description: 'SIP - HDFC Fund', category: 'Investment', amount: -5000, status: 'completed' },
      { id: '3', date: '05 Mar 2026', description: 'Rent', category: 'Housing', amount: -15000, status: 'completed' },
      { id: '4', date: '03 Mar 2026', description: 'Groceries', category: 'Food', amount: -4000, status: 'completed' },
    ],
    creditReport: {
      score: 745,
      scoreHistory: [
        { month: 'Jan', score: 720 }, { month: 'Mar', score: 730 },
        { month: 'May', score: 738 }, { month: 'Jul', score: 742 },
      ],
      report: { totalAccounts: 5, activeAccounts: 3, closedAccounts: 2, totalCredit: 450000, creditUtilization: 35, paymentHistory: 92 }
    },
    epfDetails: { balance: 250000, employeeContribution: 125000, employerContribution: 125000, interestRate: 8.25, totalContributions: 250000, interestEarned: 35000, uan: '987654321098', memberId: 'MH/MUM/789012' },
    mfTransactions: [
      { id: '1', date: '2026-01-01', scheme: 'HDFC Mid Cap', type: 'sip', amount: 5000, units: 28.9, nav: 173.01 },
      { id: '2', date: '2026-02-01', scheme: 'HDFC Mid Cap', type: 'sip', amount: 5000, units: 27.65, nav: 180.83 },
      { id: '3', date: '2026-03-01', scheme: 'HDFC Mid Cap', type: 'sip', amount: 5000, units: 26.52, nav: 188.57 },
    ],
    holdings: [
      { name: 'HDFC Mid Cap Opp.', schemeCode: 'HDFC_MID_CAP', platform: 'Groww', invested: 15000, currentValue: 17070, returns: 13.8, units: 90.54, nav: 188.57 },
      { name: 'SBI Small Cap', schemeCode: 'SBI_SMALL_CAP', platform: 'Zerodha', invested: 10000, currentValue: 11200, returns: 12.0, units: 80.0, nav: 140.0 },
    ]
  };
}

function generateDebtHeavyData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 380000,
      totalLiabilities: 520000,
      netWorth: -140000,
      breakdown: { savings: 80000, investments: 120000, epf: 90000, insurance: 50000, loans: 520000 },
      history: [
        { month: 'Jan', value: -180000 }, { month: 'Feb', value: -165000 },
        { month: 'Mar', value: -155000 }, { month: 'Apr', value: -150000 },
        { month: 'May', value: -145000 }, { month: 'Jun', value: -140000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary Credit', category: 'Income', amount: 45000, status: 'completed' },
      { id: '2', date: '12 Mar 2026', description: 'Personal Loan EMI', category: 'EMI', amount: -18000, status: 'completed' },
      { id: '3', date: '10 Mar 2026', description: 'Credit Card Min Due', category: 'Credit Card', amount: -8500, status: 'completed' },
      { id: '4', date: '08 Mar 2026', description: 'Suspicious Transaction', category: 'Shopping', amount: -25000, status: 'suspicious' },
    ],
    creditReport: {
      score: 625,
      scoreHistory: [
        { month: 'Jan', score: 580 }, { month: 'Mar', score: 595 },
        { month: 'May', score: 610 }, { month: 'Jul', score: 620 },
      ],
      report: { totalAccounts: 8, activeAccounts: 6, closedAccounts: 2, totalCredit: 520000, creditUtilization: 78, paymentHistory: 72 }
    },
    epfDetails: { balance: 90000, employeeContribution: 45000, employerContribution: 45000, interestRate: 8.25, totalContributions: 90000, interestEarned: 12000, uan: '456789123012', memberId: 'KN/BLR/456789' },
    mfTransactions: [
      { id: '1', date: '2026-01-01', scheme: 'SBI Small Cap', type: 'sip', amount: 2000, units: 14.2, nav: 140.85 },
      { id: '2', date: '2026-02-01', scheme: 'SBI Small Cap', type: 'sip', amount: 2000, units: 13.1, nav: 152.67 },
    ],
    holdings: [
      { name: 'SBI Small Cap Fund', schemeCode: 'SBI_SMALL_CAP', platform: 'Groww', invested: 4000, currentValue: 3920, returns: -2.0, units: 28.0, nav: 140.0 },
      { name: 'Nippon India Growth', schemeCode: 'NIPPON_GROWTH', platform: 'Zerodha', invested: 8000, currentValue: 7840, returns: -2.0, units: 56.0, nav: 140.0 },
    ]
  };
}

function generateSipSamuraiData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 2800000,
      totalLiabilities: 600000,
      netWorth: 2200000,
      breakdown: { savings: 300000, investments: 1800000, epf: 500000, insurance: 100000, loans: 600000 },
      history: [
        { month: 'Jan', value: 1850000 }, { month: 'Feb', value: 1920000 },
        { month: 'Mar', value: 2000000 }, { month: 'Apr', value: 2050000 },
        { month: 'May', value: 2120000 }, { month: 'Jun', value: 2200000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary - IT Manager', category: 'Income', amount: 125000, status: 'completed' },
      { id: '2', date: '10 Mar 2026', description: 'SIP - Multiple Funds', category: 'Investment', amount: -45000, status: 'completed' },
      { id: '3', date: '05 Mar 2026', description: 'Stock Purchase', category: 'Investment', amount: -25000, status: 'completed' },
      { id: '4', date: '01 Mar 2026', description: 'IPO Refund', category: 'Income', amount: 15000, status: 'completed' },
      { id: '5', date: '25 Feb 2026', description: 'Dividend Income', category: 'Income', amount: 22000, status: 'completed' },
    ],
    creditReport: {
      score: 795,
      scoreHistory: [
        { month: 'Jan', score: 760 }, { month: 'Mar', score: 770 },
        { month: 'May', score: 780 }, { month: 'Jul', score: 788 },
        { month: 'Sep', score: 792 }, { month: 'Nov', score: 795 },
      ],
      report: { totalAccounts: 10, activeAccounts: 5, closedAccounts: 5, totalCredit: 1200000, creditUtilization: 30, paymentHistory: 96 }
    },
    epfDetails: { balance: 500000, employeeContribution: 250000, employerContribution: 250000, interestRate: 8.25, totalContributions: 500000, interestEarned: 75000, uan: '567890123456', memberId: 'KA/blr/234567' },
    mfTransactions: [
      { id: '1', date: '2025-12-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 10000, units: 58.1, nav: 172.1 },
      { id: '2', date: '2026-01-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 10000, units: 56.85, nav: 175.9 },
      { id: '3', date: '2026-02-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 10000, units: 55.37, nav: 180.6 },
      { id: '4', date: '2026-03-01', scheme: 'Mirae Asset Large Cap', type: 'sip', amount: 10000, units: 54.35, nav: 184.0 },
      { id: '5', date: '2025-12-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 8000, units: 27.83, nav: 287.5 },
      { id: '6', date: '2026-01-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 8000, units: 27.15, nav: 294.6 },
      { id: '7', date: '2026-02-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 8000, units: 26.21, nav: 305.4 },
      { id: '8', date: '2026-03-01', scheme: 'Axis Bluechip Fund', type: 'sip', amount: 8000, units: 25.52, nav: 313.5 },
      { id: '9', date: '2025-12-01', scheme: 'DSP Tax Saver', type: 'sip', amount: 5000, units: 42.5, nav: 117.65 },
      { id: '10', date: '2026-01-01', scheme: 'DSP Tax Saver', type: 'sip', amount: 5000, units: 41.2, nav: 121.36 },
      { id: '11', date: '2026-02-01', scheme: 'DSP Tax Saver', type: 'sip', amount: 5000, units: 40.0, nav: 125.0 },
      { id: '12', date: '2026-03-01', scheme: 'DSP Tax Saver', type: 'sip', amount: 5000, units: 38.9, nav: 128.53 },
      { id: '13', date: '2025-12-01', scheme: 'Nippon India Growth', type: 'sip', amount: 7000, units: 35.0, nav: 200.0 },
      { id: '14', date: '2026-01-01', scheme: 'Nippon India Growth', type: 'sip', amount: 7000, units: 34.15, nav: 205.0 },
      { id: '15', date: '2026-02-01', scheme: 'Nippon India Growth', type: 'sip', amount: 7000, units: 33.02, nav: 212.0 },
      { id: '16', date: '2026-03-01', scheme: 'Nippon India Growth', type: 'sip', amount: 7000, units: 32.0, nav: 218.75 },
    ],
    holdings: [
      { name: 'Mirae Asset Large Cap', schemeCode: 'MIRAE_LARGE_CAP', platform: 'Groww', invested: 40000, currentValue: 46040, returns: 15.1, units: 250.22, nav: 184.0 },
      { name: 'Axis Bluechip Fund', schemeCode: 'AXIS_BLUECHIP', platform: 'Zerodha', invested: 32000, currentValue: 36864, returns: 15.2, units: 117.59, nav: 313.5 },
      { name: 'DSP Tax Saver', schemeCode: 'DSP_TAX_SAVER', platform: 'Groww', invested: 20000, currentValue: 23140, returns: 15.7, units: 180.0, nav: 128.53 },
      { name: 'Nippon India Growth', schemeCode: 'NIPPON_GROWTH', platform: 'Zerodha', invested: 28000, currentValue: 32920, returns: 17.57, units: 150.51, nav: 218.75 },
    ]
  };
}

function generateFixedIncomeData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 3200000,
      totalLiabilities: 0,
      netWorth: 3200000,
      breakdown: { savings: 600000, investments: 1900000, epf: 400000, insurance: 200000, loans: 0 },
      history: [
        { month: 'Jan', value: 2800000 }, { month: 'Feb', value: 2900000 },
        { month: 'Mar', value: 3000000 }, { month: 'Apr', value: 3050000 },
        { month: 'May', value: 3120000 }, { month: 'Jun', value: 3200000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary - Manager', category: 'Income', amount: 95000, status: 'completed' },
      { id: '2', date: '12 Mar 2026', description: 'FD Interest', category: 'Income', amount: 18000, status: 'completed' },
      { id: '3', date: '10 Mar 2026', description: 'Bond Redemption', category: 'Investment', amount: 100000, status: 'completed' },
      { id: '4', date: '05 Mar 2026', description: 'New FD', category: 'Investment', amount: -150000, status: 'completed' },
      { id: '5', date: '01 Mar 2026', description: 'Post Office MIS', category: 'Income', amount: 8500, status: 'completed' },
    ],
    creditReport: {
      score: 850,
      scoreHistory: [
        { month: 'Jan', score: 820 }, { month: 'Mar', score: 830 },
        { month: 'May', score: 840 }, { month: 'Jul', score: 845 },
        { month: 'Sep', score: 848 }, { month: 'Nov', score: 850 },
      ],
      report: { totalAccounts: 6, activeAccounts: 3, closedAccounts: 3, totalCredit: 200000, creditUtilization: 10, paymentHistory: 100 }
    },
    epfDetails: { balance: 400000, employeeContribution: 200000, employerContribution: 200000, interestRate: 8.25, totalContributions: 400000, interestEarned: 80000, uan: '678901234567', memberId: 'DL/NCR/567890' },
    mfTransactions: [
      { id: '1', date: '2026-01-15', scheme: 'HDFC Short Term', type: 'purchase', amount: 100000, units: 1000, nav: 100.0 },
      { id: '2', date: '2026-02-15', scheme: 'HDFC Short Term', type: 'purchase', amount: 50000, units: 492.6, nav: 101.5 },
    ],
    holdings: [
      { name: 'HDFC Short Term Debt', schemeCode: 'HDFC_SHORT_TERM', platform: 'Groww', invested: 150000, currentValue: 156000, returns: 4.0, units: 1522.17, nav: 102.5 },
      { name: 'ICICI Prudential Gilt', schemeCode: 'ICICI_GILT', platform: 'Zerodha', invested: 200000, currentValue: 212000, returns: 6.0, units: 2000, nav: 106.0 },
    ]
  };
}

function generateDefaultData(): ReturnType<typeof generateMockData> {
  return {
    netWorth: {
      totalAssets: 500000,
      totalLiabilities: 200000,
      netWorth: 300000,
      breakdown: { savings: 100000, investments: 200000, epf: 150000, insurance: 50000, loans: 200000 },
      history: [
        { month: 'Jan', value: 250000 }, { month: 'Feb', value: 265000 },
        { month: 'Mar', value: 280000 }, { month: 'Apr', value: 275000 },
        { month: 'May', value: 290000 }, { month: 'Jun', value: 300000 },
      ]
    },
    transactions: [
      { id: '1', date: '15 Mar 2026', description: 'Salary Credit', category: 'Income', amount: 50000, status: 'completed' },
      { id: '2', date: '10 Mar 2026', description: 'SIP Investment', category: 'Investment', amount: -5000, status: 'completed' },
    ],
    creditReport: {
      score: 720,
      scoreHistory: [
        { month: 'Jan', score: 700 }, { month: 'Mar', score: 710 },
      ],
      report: { totalAccounts: 4, activeAccounts: 2, closedAccounts: 2, totalCredit: 200000, creditUtilization: 40, paymentHistory: 88 }
    },
    epfDetails: { balance: 150000, employeeContribution: 75000, employerContribution: 75000, interestRate: 8.25, totalContributions: 150000, interestEarned: 20000, uan: '111222333444', memberId: 'KA/BLR/123456' },
    mfTransactions: [
      { id: '1', date: '2026-01-01', scheme: 'SBI Bluechip', type: 'sip', amount: 5000, units: 30.0, nav: 166.67 },
    ],
    holdings: [
      { name: 'SBI Bluechip', schemeCode: 'SBI_BLUECHIP', platform: 'Groww', invested: 5000, currentValue: 5250, returns: 5.0, units: 31.5, nav: 166.67 },
    ]
  };
}