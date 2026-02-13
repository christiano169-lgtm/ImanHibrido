import React from 'react';
import { StatCard } from '../components/Dashboard/StatCard';
import { ActivityGraph } from '../components/Dashboard/ActivityGraph';
import { ActiveAgents } from '../components/Dashboard/ActiveAgents';
import { TacticalLog } from '../components/Dashboard/TacticalLog';
import { Metric, ActiveAgent } from '../types';

interface DashboardPageProps {
  onAgentClick: (agent: ActiveAgent) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onAgentClick }) => {
  const stats: Metric[] = [
    { label: 'Ingresos Totales', value: '$12,450', trend: 12.5, trendDirection: 'up', color: 'primary' },
    { label: 'Proxies Activos', value: '458', trend: 2.1, trendDirection: 'up', color: 'secondary' },
    { label: 'Cuentas Caídas', value: '12', trend: 0.5, trendDirection: 'down', color: 'alert' },
    { label: 'Bloqueado en Escrow', value: '$4,200', trend: 5.4, trendDirection: 'up', color: 'primary' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen">
      
      {/* Top Row: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Middle Row: Graph & Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[400px]">
        <div className="lg:col-span-2 h-full">
          <ActivityGraph />
        </div>
        <div className="h-full">
          <TacticalLog />
        </div>
      </div>

      {/* Bottom Row: Active Agents */}
      <ActiveAgents onAgentClick={onAgentClick} />

      {/* Marketing/Upsell Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-3 lg:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex -space-x-3 mb-6">
                 {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/50/50?random=${i+20}`} className="w-12 h-12 rounded-full border-2 border-indigo-500" alt="Team" />
                 ))}
              </div>
              <h2 className="text-5xl font-bold mb-2">+278k</h2>
              <p className="text-indigo-200 font-medium">Empleados tercerizados<br/>gestionados por IA</p>
            </div>
         </div>
      </div>
    </div>
  );
};
