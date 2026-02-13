import React from 'react';
import { Phone, Clock, MoreVertical, MessageSquare, Zap, Eye } from 'lucide-react';
import { ActiveAgent } from '../../types';

interface ActiveAgentsProps {
  onAgentClick?: (agent: ActiveAgent) => void;
}

export const MOCK_AGENTS: ActiveAgent[] = [
  { id: '1', name: 'Sophia Hayes', status: 'active', current_task: 'Outbound - Script A', time_elapsed: '01:54:38', efficiency_score: 94, avatar_url: 'https://picsum.photos/40/40?random=1', target_account: '@juan.perez_ceo' },
  { id: '2', name: 'Owen Darnell', status: 'active', current_task: 'Secuencia de Calentamiento', time_elapsed: '01:54:38', efficiency_score: 82, avatar_url: 'https://picsum.photos/40/40?random=2', target_account: '@tech_startup_mx' },
  { id: '3', name: 'Emma Larkin', status: 'active', current_task: 'Respuesta DM', time_elapsed: '01:51:43', efficiency_score: 98, avatar_url: 'https://picsum.photos/40/40?random=3', target_account: '@marketing.pro' },
];

export const ActiveAgents: React.FC<ActiveAgentsProps> = ({ onAgentClick }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-semibold text-white">Agentes Fantasma (Desplegados)</h3>
        <span className="text-xs text-tactical-primary animate-pulse">● Sistema Operativo</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_AGENTS.map((agent) => (
          <div 
            key={agent.id} 
            onClick={() => onAgentClick && onAgentClick(agent)}
            className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 hover:border-tactical-primary/30 transition-all group cursor-pointer relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4 text-tactical-primary" />
             </div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={agent.avatar_url} alt={agent.name} className="w-10 h-10 rounded-full border border-white/10" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-tactical-primary rounded-full border-2 border-slate-900"></span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{agent.name}</h4>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono">{agent.time_elapsed}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-tactical-primary text-xs font-bold bg-tactical-primary/10 px-2 py-1 rounded">
                <MessageSquare className="w-3 h-3" />
                <span>34 DMs</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>{agent.efficiency_score}% Efic.</span>
              </div>
            </div>

            {/* Activity Dots Visualization */}
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-mono mb-1">REQ/SEG</div>
              <div className="flex flex-wrap gap-1">
                 {Array.from({ length: 24 }).map((_, i) => (
                   <div 
                     key={i} 
                     className={`w-2 h-2 rounded-full ${i < 18 ? 'bg-indigo-500' : 'bg-slate-700'} ${i > 20 ? 'animate-pulse bg-yellow-400' : ''}`}
                   ></div>
                 ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500">ID {agent.id}5774</span>
              <div className="flex gap-2 text-slate-400">
                <span className="text-xs text-tactical-secondary">Ver en vivo &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
