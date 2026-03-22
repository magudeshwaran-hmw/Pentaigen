import React from 'react';
import { TrendingUp, Calendar, Target, BarChart3, Loader2, AlertCircle } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import { useNetWorth, useMutualFundHoldings } from '@/hooks/useUserData';
import {
  months, portfolio, invested, quarters, sipData, niftyData,
  assetAllocation, holdings as defaultHoldings, formatFullCurrency, chartTooltipStyle,
} from '@/data/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

// Default fallback data
const defaultPortfolioData = months.map((m, i) => ({ month: m, portfolio: portfolio[i], invested: invested[i] }));
const defaultSipVsNifty = quarters.map((q, i) => ({ quarter: q, SIP: sipData[i], Nifty: niftyData[i] }));

const Investments: React.FC = () => {
  const { data: netWorthData, isLoading: netWorthLoading, error: netWorthError } = useNetWorth();
  const { data: holdings, isLoading: holdingsLoading, error: holdingsError } = useMutualFundHoldings();

  const isLoading = netWorthLoading || holdingsLoading;
  const hasError = netWorthError || holdingsError;

  // Calculate values from MCP data or use defaults
  const totalPortfolio = holdings?.reduce((sum, h) => sum + (h.currentValue || 0), 0) ?? 468200;
  const totalInvested = holdings?.reduce((sum, h) => sum + (h.invested || 0), 0) ?? 440000;
  const xirr = totalInvested > 0 ? ((totalPortfolio - totalInvested) / totalInvested * 100).toFixed(1) : '9.8';
  const projected2yr = totalPortfolio * 1.307; // Simple projection

  // Portfolio data
  const portfolioData = netWorthData?.history
    ? netWorthData.history.map((h, i) => ({ month: h.month, portfolio: h.value, invested: invested[i] || h.value * 0.9 }))
    : defaultPortfolioData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-penta-rose mx-auto mb-4" />
          <h3 className="text-lg font-medium text-penta-text1 mb-2">Unable to load data</h3>
          <p className="text-sm text-penta-text2">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-display italic text-penta-text1">Investments</h1>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-penta-teal" />
          <span className="text-xs sm:text-sm text-penta-text2">Portfolio Performance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard title="Portfolio XIRR" value={`${xirr}%`} trend={{ value: '+1.2%', direction: 'up' }}
          icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />} colorClass="bg-penta-teal-light text-penta-teal" />
        <MetricCard title="Monthly SIP" value="₹25,000" trend={{ value: 'Active', direction: 'up' }}
          icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />} colorClass="bg-penta-blue-light text-penta-blue" />
        <MetricCard title="Total Portfolio" value={formatFullCurrency(totalPortfolio)} trend={{ value: '+9.8%', direction: 'up' }}
          icon={<BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />} colorClass="bg-penta-violet-light text-penta-violet" />
        <MetricCard title="2yr Projected" value={formatFullCurrency(projected2yr)} trend={{ value: '+30.7%', direction: 'up' }}
          icon={<Target className="w-4 h-4 sm:w-5 sm:h-5" />} colorClass="bg-penta-amber-light text-penta-amber" />
      </div>

      {/* Portfolio Growth (large) */}
      <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-sm font-medium text-penta-text1 font-body">Portfolio Growth</h3>
          <span className="text-xs text-penta-teal font-medium">+9.8% this month</span>
        </div>
        <div className="h-[240px] sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="gradInvest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
              <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
              <Area type="monotone" dataKey="portfolio" stroke="#2563eb" strokeWidth={2} fill="url(#gradInvest)" />
              <Area type="monotone" dataKey="invested" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
              <Legend iconType="line" wrapperStyle={{ fontSize: 10 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Allocation + SIP vs Nifty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Asset Allocation</h3>
            <span className="text-xs text-penta-blue font-medium">Balanced</span>
          </div>
          <div className="h-[200px] sm:h-[220px] flex items-center">
            <div className="w-full sm:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                    {assetAllocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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
                  <div className="flex-1 h-1.5 sm:h-2 bg-penta-surface1 rounded-full overflow-hidden ml-1">
                    <div className="h-full rounded-full" style={{ width: `${a.value}%`, backgroundColor: a.color }} />
                  </div>
                  <span className="text-xs font-medium text-penta-text1 font-body w-6 sm:w-8 text-right">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-4 sm:p-5 shadow-penta border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">SIP Performance vs Nifty 50</h3>
            <span className="text-xs text-penta-teal font-medium">Outperforming</span>
          </div>
          <div className="h-[200px] sm:h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={defaultSipVsNifty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="SIP" stroke="#00a87c" strokeWidth={2} dot={{ r: 2, fill: '#00a87c' }} />
                <Line type="monotone" dataKey="Nifty" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                <Legend iconType="line" wrapperStyle={{ fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-card rounded-[14px] shadow-penta border border-border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4 sm:p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-sm font-medium text-penta-text1 font-body">Holdings</h3>
            <button className="text-xs text-penta-blue hover:text-penta-blue/80 font-medium">View All</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm font-body">
            <thead>
              <tr className="border-b border-border">
                {['Fund / Stock', 'Platform', 'Invested', 'Current Value', 'Returns'].map(h => (
                  <th key={h} className="text-left px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-penta-text3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(holdings && holdings.length > 0 ? holdings : defaultHoldings).map((h, i) => (
                <tr key={h.name + i} className="border-b border-border last:border-0 hover:bg-penta-surface1/50 transition-colors">
                  <td className="px-3 sm:px-5 py-2 sm:py-3 font-medium text-penta-text1">
                    <div className="max-w-[120px] sm:max-w-none truncate">{h.name}</div>
                  </td>
                  <td className="px-3 sm:px-5 py-2 sm:py-3 text-penta-text2">{h.platform}</td>
                  <td className="px-3 sm:px-5 py-2 sm:py-3 text-penta-text2 font-serif-italic">{formatFullCurrency(h.invested)}</td>
                  <td className="px-3 sm:px-5 py-2 sm:py-3 text-penta-text1 font-medium font-serif-italic">{formatFullCurrency(h.currentValue)}</td>
                  <td className={`px-3 sm:px-5 py-2 sm:py-3 font-medium ${(h.returns || 0) >= 0 ? 'text-penta-teal' : 'text-penta-rose'}`}>
                    {(h.returns || 0) > 0 ? '+' : ''}{(h.returns || 0).toFixed(1)}%
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

export default Investments;
