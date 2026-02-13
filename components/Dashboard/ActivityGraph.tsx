import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA } from '../../constants';

export const ActivityGraph: React.FC = () => {
  return (
    <div className="w-full h-[350px] bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Tráfico de Red & Interacción</h3>
          <p className="text-xs text-slate-500 font-mono">FEED EN VIVO • ROTACIÓN DE PROXY ACTIVA</p>
        </div>
        <div className="flex gap-2">
          {['1H', '24H', '7D'].map((t) => (
             <button key={t} className={`px-3 py-1 text-xs font-mono rounded-lg border ${t === '24H' ? 'bg-tactical-primary/20 border-tactical-primary/50 text-tactical-primary' : 'bg-transparent border-white/10 text-slate-500 hover:text-white'}`}>
                {t}
             </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={MOCK_CHART_DATA}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'JetBrains Mono' }} 
            dy={10}
          />
          <YAxis 
            hide 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#94a3b8', fontFamily: 'JetBrains Mono' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
          {/* Secondary dashed line simulating prediction or previous period */}
          <Area 
             type="monotone"
             dataKey="value" 
             stroke="#eab308" 
             strokeWidth={2}
             strokeDasharray="5 5"
             fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
