import React from 'react';
import { Landmark, PiggyBank, Building, Home } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import {
  nwTrend, liab, quarters, breakdown, bkLabels, taxUsed, taxLeft, taxSections,
  creditHistory, creditMonths, formatFullCurrency, chartTooltipStyle,
} from '@/data/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend,
} from 'recharts';

const nwData = quarters.map((q, i) => ({ quarter: q, netWorth: nwTrend[i], liabilities: liab[i] }));
const breakdownData = bkLabels.map((l, i) => ({ name: l, value: breakdown[i] }));
const breakdownColors = ['#2563eb', '#00a87c', '#7c3aed', '#d97706', '#e11d48'];
const taxData = taxSections.map((s, i) => ({ section: s, used: taxUsed[i], remaining: taxLeft[i] }));
const creditData = creditMonths.map((m, i) => ({ month: m, score: creditHistory[i] }));

const NetWorth: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <h1 className="text-3xl font-display italic text-penta-text1">Net Worth</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Net Worth" value="₹12,47,850" trend={{ value: '+5.4%', direction: 'up' }}
          icon={<Landmark className="w-5 h-5" />} colorClass="bg-penta-violet-light text-penta-violet" />
        <MetricCard title="Savings" value="₹2,47,850" trend={{ value: '+3.2%', direction: 'up' }}
          icon={<PiggyBank className="w-5 h-5" />} colorClass="bg-penta-teal-light text-penta-teal" />
        <MetricCard title="EPF / NPS" value="₹3,12,400" trend={{ value: '+8.1%', direction: 'up' }}
          icon={<Building className="w-5 h-5" />} colorClass="bg-penta-blue-light text-penta-blue" />
        <MetricCard title="Home Loan" value="-₹5,40,000" trend={{ value: '-2.3%', direction: 'down' }}
          icon={<Home className="w-5 h-5" />} colorClass="bg-penta-rose-light text-penta-rose" />
      </div>

      {/* Net Worth Trend */}
      <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Net Worth Trend</h3>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={nwData}>
              <defs>
                <linearGradient id="gradNW" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00a87c" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#00a87c" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/100000).toFixed(1)}L`} />
              <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
              <Area type="monotone" dataKey="netWorth" stroke="#00a87c" strokeWidth={2} fill="url(#gradNW)" />
              <Line type="monotone" dataKey="liabilities" stroke="#e11d48" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              <Legend iconType="line" wrapperStyle={{ fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Asset Breakdown */}
        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Asset Breakdown</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdownData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${(v/100000).toFixed(1)}L`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {breakdownData.map((_, i) => (
                    <rect key={i} fill={breakdownColors[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tax Deductions */}
        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Tax Deductions</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taxData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="section" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                <Bar dataKey="used" stackId="a" fill="#2563eb" radius={[0,0,0,0]} name="Used" />
                <Bar dataKey="remaining" stackId="a" fill="#e2e5f2" radius={[4,4,0,0]} name="Remaining" />
                <Legend iconType="square" wrapperStyle={{ fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Credit Score */}
      <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Credit Score History</h3>
        <div className="flex items-center gap-6">
          <div className="h-[180px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={creditData}>
                <defs>
                  <linearGradient id="gradCredit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00a87c" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#00a87c" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis domain={[700, 850]} tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Area type="monotone" dataKey="score" stroke="#00a87c" strokeWidth={2} fill="url(#gradCredit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center shrink-0">
            <p className="text-xs text-penta-text3 font-body mb-1">CIBIL Score</p>
            <p className="text-5xl font-serif-italic text-penta-teal">792</p>
            <p className="text-xs text-penta-teal font-body mt-1 font-medium">Excellent</p>
            <div className="w-32 h-2 rounded-full mt-3 overflow-hidden" style={{ background: 'linear-gradient(90deg, #e11d48, #d97706, #00a87c)' }}>
              <div className="w-full h-full relative">
                <div className="absolute top-0 h-full w-0.5 bg-penta-text1" style={{ left: '88%' }} />
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-penta-text3 font-body mt-0.5 w-32">
              <span>300</span><span>900</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetWorth;
