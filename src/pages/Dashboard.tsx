import React from 'react';
import { Wallet, TrendingUp, Landmark, AlertTriangle, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import { useAuth } from '@/context/AuthContext';
import { useNetWorth, useBankTransactions, useMutualFundHoldings } from '@/hooks/useUserData';
import {
  months, portfolio, invested, spend25, spend24, sipData, niftyData, quarters,
  agentActivity, agentLabels, assetAllocation, formatFullCurrency,
  chartTooltipStyle,
} from '@/data/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Legend,
} from 'recharts';

// Default fallback data
const defaultPortfolioData = months.map((m, i) => ({ month: m, portfolio: portfolio[i], invested: invested[i] }));
const defaultSpendingData = months.map((m, i) => ({ month: m, '2025': spend25[i], '2024': spend24[i] }));
const defaultSipVsNifty = quarters.map((q, i) => ({ quarter: q, SIP: sipData[i], Nifty: niftyData[i] }));
const agentData = agentLabels.map((l, i) => ({ name: l, tasks: agentActivity[i] }));
const agentColors = ['#2563eb', '#00a87c', '#7c3aed', '#dc2626', '#d97706', '#0284c7'];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: netWorthData, isLoading: netWorthLoading } = useNetWorth();
  const { data: transactions, isLoading: transactionsLoading } = useBankTransactions();
  const { data: holdings, isLoading: holdingsLoading } = useMutualFundHoldings();

  // Calculate values from MCP data or use defaults
  const totalBalance = netWorthData?.totalAssets ?? 247850;
  const investments = holdings?.reduce((sum, h) => sum + h.currentValue, 0) ?? 468200;
  const netWorth = netWorthData?.netWorth ?? 1247850;
  const fraudAlerts = transactions?.filter(t => t.status === 'flagged' || t.status === 'suspicious').length ?? 2;

  // Portfolio data - use real history if available
  const portfolioData = netWorthData?.history
    ? netWorthData.history.map((h, i) => ({ month: h.month, portfolio: h.value, invested: invested[i] || h.value * 0.9 }))
    : defaultPortfolioData;

  const isLoading = netWorthLoading || transactionsLoading || holdingsLoading;
  const firstName = 'User'; // Could be derived from user profile if available

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-penta-blue/10 to-penta-violet/10 p-4 sm:p-6 rounded-2xl border border-penta-surface1">
        <h1 className="text-2xl sm:text-3xl font-display italic text-penta-text1 mb-2">Good morning, {firstName} 👋</h1>
        <p className="text-sm text-penta-text2 font-body">Here is your financial overview for today. Your portfolio is up 9.8% this month!</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Total Balance"
          value={formatFullCurrency(totalBalance)}
          trend={{ value: '+3.2%', direction: 'up' }}
          icon={<Wallet className="w-4 h-4 sm:w-5 sm:h-5" />}
          colorClass="bg-penta-blue-light text-penta-blue"
        />
        <MetricCard
          title="Investments"
          value={formatFullCurrency(investments)}
          trend={{ value: '+9.8%', direction: 'up' }}
          icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}
          colorClass="bg-penta-teal-light text-penta-teal"
        />
        <MetricCard
          title="Net Worth"
          value={formatFullCurrency(netWorth)}
          trend={{ value: '+5.4%', direction: 'up' }}
          icon={<Landmark className="w-4 h-4 sm:w-5 sm:h-5" />}
          colorClass="bg-penta-violet-light text-penta-violet"
        />
        <MetricCard
          title="Fraud Risk"
          value={`${fraudAlerts} Alert${fraudAlerts !== 1 ? 's' : ''}`}
          trend={{ value: fraudAlerts > 0 ? 'Review' : 'Clear', direction: fraudAlerts > 0 ? 'down' : 'up' }}
          icon={<AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}
          colorClass={fraudAlerts > 0 ? "bg-penta-rose-light text-penta-rose" : "bg-penta-teal-light text-penta-teal"}
        />
      </div>

      {/* Chart Row 1: Portfolio Growth + Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Portfolio Growth</h3>
            <span className="text-xs text-penta-teal font-medium">+9.8% this month</span>
          </div>
          <div className="h-[200px] sm:h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="gradPortfolio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                <Area type="monotone" dataKey="portfolio" stroke="#2563eb" strokeWidth={2} fill="url(#gradPortfolio)" />
                <Area type="monotone" dataKey="invested" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Asset Allocation</h3>
            <span className="text-xs text-penta-blue font-medium">Well diversified</span>
          </div>
          <div className="h-[200px] sm:h-[220px] flex items-center">
            <div className="w-full sm:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                    {assetAllocation.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltipStyle} formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2 sm:space-y-3 ml-0 sm:ml-4">
              {assetAllocation.map((a) => (
                <div key={a.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-penta-text2 font-body">{a.name}</span>
                  <span className="ml-auto font-medium text-penta-text1 text-xs">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Monthly Spending + SIP vs Nifty + Agent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Monthly Spending</h3>
            <span className="text-xs text-penta-amber font-medium">-12% vs last year</span>
          </div>
          <div className="h-[160px] sm:h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defaultSpendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                <Bar dataKey="2025" fill="#2563eb" radius={[4,4,0,0]} />
                <Bar dataKey="2024" fill="#e2e5f2" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">SIP vs Nifty 50</h3>
            <span className="text-xs text-penta-teal font-medium">Outperforming</span>
          </div>
          <div className="h-[160px] sm:h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={defaultSipVsNifty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="quarter" tick={{ fontSize: 9, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="SIP" stroke="#00a87c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Nifty" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                <Legend iconType="line" wrapperStyle={{ fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Agent Activity</h3>
            <span className="text-xs text-penta-violet font-medium">42 tasks today</span>
          </div>
          <div className="h-[160px] sm:h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: '#52527a' }} axisLine={false} tickLine={false} width={50} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="tasks" radius={[0,4,4,0]}>
                  {agentData.map((_, i) => <Cell key={i} fill={agentColors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-[14px] shadow-penta border border-border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4 sm:p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Recent Transactions</h3>
            <button className="text-xs text-penta-blue hover:text-penta-blue/80 font-medium">View All</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm font-body">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Transaction</th>
                <th className="text-left px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Date</th>
                <th className="text-left px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Category</th>
                <th className="text-right px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Amount</th>
                <th className="text-left px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(transactions || []).map((tx, i) => (
                <tr
                  key={tx.id || i}
                  className={`border-b border-border last:border-0 hover:bg-penta-surface1/50 transition-colors ${
                    tx.status === 'flagged' ? 'bg-penta-rose/5' : tx.status === 'suspicious' ? 'bg-penta-amber/5' : ''
                  }`}
                >
                  <td className="px-3 sm:px-5 py-2 sm:py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        tx.amount > 0 ? 'bg-penta-teal-light text-penta-teal' : 'bg-penta-surface1 text-penta-text2'
                      }`}>
                        {tx.amount > 0 ? <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" /> : <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </span>
                      <span className="text-penta-text1 font-medium text-xs sm:text-sm max-w-[100px] sm:max-w-none truncate">{tx.description}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-2 sm:py-3 text-penta-text2 text-xs sm:text-sm">{tx.date}</td>
                  <td className="px-3 sm:px-5 py-2 sm:py-3">
                    <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-penta-surface1 text-penta-text2">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-3 sm:px-5 py-2 sm:py-3 text-right font-medium font-serif-italic text-xs sm:text-sm ${
                    tx.amount > 0 ? 'text-penta-teal' : 'text-penta-text1'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}{formatFullCurrency(tx.amount)}
                  </td>
                  <td className="px-3 sm:px-5 py-2 sm:py-3">
                    <span className={`text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                      tx.status === 'completed' ? 'bg-penta-teal-light text-penta-teal' :
                      tx.status === 'flagged' ? 'bg-penta-rose-light text-penta-rose' :
                      'bg-penta-amber-light text-penta-amber'
                    }`}>
                      {tx.status === 'completed' ? '✓ Completed' : tx.status === 'flagged' ? '⚠ Fraud Risk' : '⚡ Suspicious'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
