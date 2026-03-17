import React from 'react';
import { TrendingUp, Calendar, Target, BarChart3 } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import {
  months, portfolio, invested, quarters, sipData, niftyData,
  assetAllocation, holdings, formatFullCurrency, chartTooltipStyle,
} from '@/data/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

const portfolioData = months.map((m, i) => ({ month: m, portfolio: portfolio[i], invested: invested[i] }));
const sipVsNifty = quarters.map((q, i) => ({ quarter: q, SIP: sipData[i], Nifty: niftyData[i] }));

const Investments: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <h1 className="text-3xl font-display italic text-penta-text1">Investments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Portfolio XIRR" value="9.8%" trend={{ value: '+1.2%', direction: 'up' }}
          icon={<TrendingUp className="w-5 h-5" />} colorClass="bg-penta-teal-light text-penta-teal" />
        <MetricCard title="Monthly SIP" value="₹25,000" trend={{ value: 'Active', direction: 'up' }}
          icon={<Calendar className="w-5 h-5" />} colorClass="bg-penta-blue-light text-penta-blue" />
        <MetricCard title="Total Portfolio" value="₹4,68,200" trend={{ value: '+9.8%', direction: 'up' }}
          icon={<BarChart3 className="w-5 h-5" />} colorClass="bg-penta-violet-light text-penta-violet" />
        <MetricCard title="2yr Projected" value="₹6,12,000" trend={{ value: '+30.7%', direction: 'up' }}
          icon={<Target className="w-5 h-5" />} colorClass="bg-penta-amber-light text-penta-amber" />
      </div>

      {/* Portfolio Growth (large) */}
      <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Portfolio Growth</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="gradInvest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
              <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
              <Area type="monotone" dataKey="portfolio" stroke="#2563eb" strokeWidth={2} fill="url(#gradInvest)" />
              <Area type="monotone" dataKey="invested" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
              <Legend iconType="line" wrapperStyle={{ fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Allocation + SIP vs Nifty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Asset Allocation</h3>
          <div className="h-[220px] flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {assetAllocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {assetAllocation.map((a) => (
                <div key={a.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-penta-text2 font-body">{a.name}</span>
                  <div className="flex-1 h-2 bg-penta-surface1 rounded-full overflow-hidden ml-1">
                    <div className="h-full rounded-full" style={{ width: `${a.value}%`, backgroundColor: a.color }} />
                  </div>
                  <span className="text-xs font-medium text-penta-text1 font-body w-8 text-right">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">SIP Performance vs Nifty 50</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sipVsNifty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="SIP" stroke="#00a87c" strokeWidth={2} dot={{ r: 3, fill: '#00a87c' }} />
                <Line type="monotone" dataKey="Nifty" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                <Legend iconType="line" wrapperStyle={{ fontSize: 11 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-card rounded-[14px] shadow-penta border border-border overflow-hidden">
        <div className="p-5 pb-3">
          <h3 className="text-sm font-medium text-penta-text1 font-body">Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border">
                {['Fund / Stock', 'Platform', 'Invested', 'Current Value', 'Returns'].map(h => (
                  <th key={h} className="text-left px-5 py-2.5 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium text-penta-text1">{h.name}</td>
                  <td className="px-5 py-3 text-penta-text2">{h.platform}</td>
                  <td className="px-5 py-3 text-penta-text2 font-serif-italic">{formatFullCurrency(h.invested)}</td>
                  <td className="px-5 py-3 text-penta-text1 font-medium font-serif-italic">{formatFullCurrency(h.current)}</td>
                  <td className={`px-5 py-3 font-medium ${h.returns >= 0 ? 'text-penta-teal' : 'text-penta-rose'}`}>
                    {h.returns > 0 ? '+' : ''}{h.returns}%
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
