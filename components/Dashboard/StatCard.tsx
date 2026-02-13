import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Metric } from '../../types';

interface StatCardProps {
  metric: Metric;
}

export const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  const isPositive = metric.trendDirection === 'up';
  
  // Tactical Color Mapping
  const colors = {
    primary: 'text-tactical-primary',
    secondary: 'text-tactical-secondary',
    alert: 'text-tactical-alert',
  };

  const bgGlow = {
    primary: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    secondary: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    alert: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]',
  };

  return (
    <div className={`relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 ${bgGlow[metric.color]} transition-all hover:border-white/10 group`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{metric.label}</p>
          <h3 className="text-3xl font-bold text-white font-mono tracking-tight">{metric.value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-white/5 ${colors[metric.color]} group-hover:scale-110 transition-transform`}>
           <Activity className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full bg-white/5 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(metric.trend)}%
        </span>
        <span className="text-xs text-slate-500">vs semana anterior</span>
      </div>
    </div>
  );
};
