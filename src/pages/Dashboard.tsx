import React from 'react';
import { Wallet, TrendingUp, Landmark, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import {
  months, portfolio, invested, spend25, spend24, sipData, niftyData, quarters,
  agentActivity, agentLabels, transactions, assetAllocation, formatFullCurrency,
  chartTooltipStyle,
} from '@/data/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Legend,
} from 'recharts';

const portfolioData = months.map((m, i) => ({ month: m, portfolio: portfolio[i], invested: invested[i] }));
const spendingData = months.map((m, i) => ({ month: m, '2025': spend25[i], '2024': spend24[i] }));
const sipVsNifty = quarters.map((q, i) => ({ quarter: q, SIP: sipData[i], Nifty: niftyData[i] }));
const agentData = agentLabels.map((l, i) => ({ name: l, tasks: agentActivity[i] }));
const agentColors = ['#2563eb', '#00a87c', '#7c3aed', '#dc2626', '#d97706', '#0284c7'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-display italic text-penta-text1">Good morning, Arjun</h1>
        <p className="text-sm text-penta-text2 font-body mt-1">Here is your financial overview for today.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Balance"
          value="₹2,47,850"
          trend={{ value: '+3.2%', direction: 'up' }}
          icon={<Wallet className="w-5 h-5" />}
          colorClass="bg-penta-blue-light text-penta-blue"
        />
        <MetricCard
          title="Investments"
          value="₹4,68,200"
          trend={{ value: '+9.8%', direction: 'up' }}
          icon={<TrendingUp className="w-5 h-5" />}
          colorClass="bg-penta-teal-light text-penta-teal"
        />
        <MetricCard
          title="Net Worth"
          value="₹12,47,850"
          trend={{ value: '+5.4%', direction: 'up' }}
          icon={<Landmark className="w-5 h-5" />}
          colorClass="bg-penta-violet-light text-penta-violet"
        />
        <MetricCard
          title="Fraud Risk"
          value="2 Alerts"
          trend={{ value: 'High', direction: 'down' }}
          icon={<AlertTriangle className="w-5 h-5" />}
          colorClass="bg-penta-rose-light text-penta-rose"
        />
      </div>

      {/* Chart Row 1: Portfolio Growth + Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Portfolio Growth</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="gradPortfolio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                <Area type="monotone" dataKey="portfolio" stroke="#2563eb" strokeWidth={2} fill="url(#gradPortfolio)" />
                <Area type="monotone" dataKey="invested" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Asset Allocation</h3>
          <div className="h-[220px] flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {assetAllocation.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {assetAllocation.map((a) => (
                <div key={a.name} className="flex items-center gap-2 text-xs font-body">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-penta-text2">{a.name}</span>
                  <span className="ml-auto font-medium text-penta-text1">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Monthly Spending + SIP vs Nifty + Agent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Monthly Spending</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                <Bar dataKey="2025" fill="#2563eb" radius={[4,4,0,0]} />
                <Bar dataKey="2024" fill="#e2e5f2" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">SIP vs Nifty 50</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sipVsNifty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="SIP" stroke="#00a87c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Nifty" stroke="#9898b8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                <Legend iconType="line" wrapperStyle={{ fontSize: 11 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Agent Activity</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} width={60} />
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
      <div className="bg-card rounded-[14px] shadow-penta border border-border overflow-hidden">
        <div className="p-5 pb-3">
          <h3 className="text-sm font-medium text-penta-text1 font-body">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Transaction</th>
                <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Date</th>
                <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Category</th>
                <th className="text-right px-5 py-2.5 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Amount</th>
                <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr
                  key={i}
                  className={`border-b border-border last:border-0 ${
                    tx.status === 'flagged' ? 'bg-penta-rose-light' : tx.status === 'suspicious' ? 'bg-penta-amber-light' : ''
                  }`}
                >
                  <td className="px-5 py-3 flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.amount > 0 ? 'bg-penta-teal-light text-penta-teal' : 'bg-penta-surface1 text-penta-text2'
                    }`}>
                      {tx.amount > 0 ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    </span>
                    <span className="text-penta-text1 font-medium">{tx.name}</span>
                  </td>
                  <td className="px-5 py-3 text-penta-text2">{tx.date}</td>
                  <td className="px-5 py-3 text-penta-text2">{tx.category}</td>
                  <td className={`px-5 py-3 text-right font-medium font-serif-italic ${
                    tx.amount > 0 ? 'text-penta-teal' : 'text-penta-text1'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}{formatFullCurrency(tx.amount)}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      tx.status === 'completed' ? 'bg-penta-teal-light text-penta-teal' :
                      tx.status === 'flagged' ? 'bg-penta-rose-light text-penta-rose' :
                      'bg-penta-amber-light text-penta-amber'
                    }`}>
                      {tx.status === 'completed' ? 'Completed' : tx.status === 'flagged' ? 'Fraud Risk' : 'Suspicious'}
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
