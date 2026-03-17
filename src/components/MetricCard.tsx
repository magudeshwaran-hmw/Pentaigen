import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' };
  icon: React.ReactNode;
  colorClass?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon, colorClass = 'bg-penta-blue-light text-penta-blue' }) => {
  return (
    <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colorClass)}>
          {icon}
        </div>
        {trend && (
          <span className={cn(
            'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full font-body',
            trend.direction === 'up' && 'bg-penta-teal-light text-penta-teal',
            trend.direction === 'down' && 'bg-penta-rose-light text-penta-rose',
            trend.direction === 'neutral' && 'bg-penta-surface1 text-penta-text2',
          )}>
            {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend.direction === 'neutral' && <Minus className="w-3 h-3" />}
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-xs text-penta-text2 font-body mb-1">{title}</p>
      <p className="text-2xl font-serif-italic text-penta-text1 tracking-tight">{value}</p>
    </div>
  );
};

export default MetricCard;
