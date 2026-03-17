import React from 'react';
import {
  Shield, FileText, TrendingUp, AlertTriangle, Heart, Clock,
  CreditCard, ShieldCheck, FileSearch, ShoppingBag, MessageSquare, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Shield, FileText, TrendingUp, AlertTriangle, Heart, Clock,
  CreditCard, ShieldCheck, FileSearch, ShoppingBag, MessageSquare, Zap,
};

interface AgentCardProps {
  name: string;
  gradient: [string, string];
  icon: string;
  status: 'Online' | 'Standby';
  compact?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, gradient, icon, status, compact }) => {
  const IconComponent = iconMap[icon] || Shield;

  return (
    <div className="bg-card rounded-[14px] shadow-penta border border-border overflow-hidden group hover:shadow-penta-md transition-shadow">
      <div
        className="relative h-20 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
      >
        <div className="hero-grid" />
        <div className="dot-pattern absolute inset-0" />
        <IconComponent className="w-8 h-8 text-white/90 relative z-10" />
      </div>
      <div className={cn("p-3", compact && "p-2")}>
        <p className="text-sm font-medium text-penta-text1 font-body truncate">{name}</p>
        <span className={cn(
          'inline-flex items-center gap-1.5 text-[10px] font-medium mt-1.5 px-2 py-0.5 rounded-full font-body',
          status === 'Online' ? 'bg-penta-teal-light text-penta-teal' : 'bg-penta-surface1 text-penta-text3',
        )}>
          <span className={cn(
            'w-1.5 h-1.5 rounded-full',
            status === 'Online' ? 'bg-penta-teal animate-pulse' : 'bg-penta-text3',
          )} />
          {status}
        </span>
      </div>
    </div>
  );
};

export default AgentCard;
