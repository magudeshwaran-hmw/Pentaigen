import React from 'react';
import { Calculator, Percent, Coins, CalendarClock } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import { taxUsed, taxLeft, taxSections, formatFullCurrency, chartTooltipStyle } from '@/data/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const taxData = taxSections.map((s, i) => ({ section: s, used: taxUsed[i], remaining: taxLeft[i] }));

const regimeData = [
  { label: 'Income Tax', old: 72000, new: 60000 },
  { label: 'Deductions', old: 150000, new: 50000 },
  { label: 'Taxable', old: 650000, new: 750000 },
  { label: 'Net Tax', old: 52000, new: 45000 },
];

const TaxOptimizer: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <h1 className="text-3xl font-display italic text-penta-text1">Tax Optimizer</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Potential Savings" value="₹32,760" trend={{ value: 'Actionable', direction: 'up' }}
          icon={<Coins className="w-5 h-5" />} colorClass="bg-penta-teal-light text-penta-teal" />
        <MetricCard title="80C Utilized" value="63%" trend={{ value: '₹95K / ₹1.5L', direction: 'neutral' }}
          icon={<Percent className="w-5 h-5" />} colorClass="bg-penta-blue-light text-penta-blue" />
        <MetricCard title="80CCD Unused" value="₹50,000" trend={{ value: 'NPS available', direction: 'up' }}
          icon={<Calculator className="w-5 h-5" />} colorClass="bg-penta-violet-light text-penta-violet" />
        <MetricCard title="Filing Deadline" value="31 Mar" trend={{ value: '14 days left', direction: 'down' }}
          icon={<CalendarClock className="w-5 h-5" />} colorClass="bg-penta-amber-light text-penta-amber" />
      </div>

      {/* Tax Deduction Utilization */}
      <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Tax Deduction Utilization</h3>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
              <XAxis dataKey="section" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
              <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
              <Bar dataKey="used" stackId="a" fill="#2563eb" radius={[0,0,0,0]} name="Used" />
              <Bar dataKey="remaining" stackId="a" fill="#e2e5f2" radius={[4,4,0,0]} name="Remaining" />
              <Legend iconType="square" wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Old vs New Regime */}
      <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Old vs New Tax Regime</h3>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000)}K`} />
              <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
              <Bar dataKey="old" fill="#2563eb" radius={[4,4,0,0]} name="Old Regime" />
              <Bar dataKey="new" fill="#7c3aed" radius={[4,4,0,0]} name="New Regime" />
              <Legend iconType="square" wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-penta-teal-light text-penta-teal shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-penta-text1 font-body">Open NPS Tier I</h4>
              <p className="text-xs text-penta-text2 font-body mt-1">
                Invest ₹50,000 in NPS under Section 80CCD(1B) to save ₹15,600 in taxes. This is an additional deduction over the ₹1.5L limit of 80C.
              </p>
              <button className="mt-3 px-4 py-1.5 rounded-lg bg-penta-teal text-white text-xs font-body font-medium hover:opacity-90 transition-opacity">
                Start NPS
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-penta-blue-light text-penta-blue shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-penta-text1 font-body">Complete 80C with ELSS</h4>
              <p className="text-xs text-penta-text2 font-body mt-1">
                You have ₹55,000 remaining in 80C. Invest in ELSS funds for tax saving + equity exposure. Saves ₹17,160 in taxes.
              </p>
              <button className="mt-3 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-body font-medium hover:opacity-90 transition-opacity">
                Invest in ELSS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxOptimizer;
