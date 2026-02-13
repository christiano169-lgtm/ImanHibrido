import React from 'react';
import { MOCK_AGENTS } from '../components/Dashboard/ActiveAgents';
import { Plus, Wifi, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { ActiveAgent } from '../types';

interface AgentsPageProps {
  onConnectClick: () => void;
  onAgentClick: (agent: ActiveAgent) => void;
}

export const AgentsPage: React.FC<AgentsPageProps> = ({ onConnectClick, onAgentClick }) => {
  return (
    <div className="p-6 lg:p-8 space-y-6 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
             <Wifi className="w-6 h-6 text-tactical-primary animate-pulse" />
             Centro de Comando de Bots
           </h2>
           <p className="text-slate-400 text-sm mt-1">Gestión en tiempo real de la flota de Ghost Workers.</p>
        </div>
        
        <button 
          onClick={onConnectClick}
          className="flex items-center gap-2 bg-tactical-primary hover:bg-emerald-400 text-slate-900 px-5 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <Plus className="w-5 h-5" />
          Desplegar Nuevo Agente
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase font-mono">Total Agentes</p>
            <p className="text-2xl font-bold text-white">15</p>
         </div>
         <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase font-mono">Mensajes / Hora</p>
            <p className="text-2xl font-bold text-tactical-primary">342</p>
         </div>
         <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase font-mono">Estado Proxy</p>
            <p className="text-2xl font-bold text-emerald-400 flex items-center gap-2">100% <ShieldCheck className="w-5 h-5" /></p>
         </div>
         <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase font-mono">Leads Calientes</p>
            <p className="text-2xl font-bold text-white">28</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Agent List */}
          <div className="lg:col-span-2 space-y-4">
             <div className="flex items-center justify-between text-sm text-slate-400 px-2 pb-2 border-b border-white/5">
                <span>Instancias Activas</span>
                <span>Filtro: Todos</span>
             </div>
             
             {/* Reuse Logic from MOCK_AGENTS but expand with more details */}
             {MOCK_AGENTS.map((agent) => (
               <div key={agent.id} className="bg-slate-900/80 border border-white/5 hover:border-white/20 rounded-xl p-5 transition-all flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative shrink-0">
                      <img src={agent.avatar_url} className="w-16 h-16 rounded-full border-2 border-tactical-surface" alt="Avatar" />
                      <div className="absolute bottom-0 right-0 bg-slate-900 rounded-full p-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                      </div>
                  </div>
                  
                  <div className="flex-1 w-full text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-lg">{agent.name}</h3>
                          <span className="text-xs bg-tactical-primary/10 text-tactical-primary px-2 py-0.5 rounded border border-tactical-primary/20">
                             Script A: "Value First"
                          </span>
                      </div>
                      <p className="text-slate-400 text-sm flex items-center justify-center md:justify-start gap-2">
                         <Activity className="w-4 h-4 text-slate-500" />
                         Target Actual: <span className="text-white font-mono">{agent.target_account}</span>
                      </p>
                      
                      {/* Mini Progress Bar */}
                      <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${agent.efficiency_score}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 text-right">Eficiencia: {agent.efficiency_score}%</p>
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => onAgentClick(agent)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors whitespace-nowrap"
                      >
                          Ver Pantalla &rarr;
                      </button>
                      <button className="px-4 py-2 text-slate-500 hover:text-red-400 text-xs font-medium transition-colors">
                          Detener Instancia
                      </button>
                  </div>
               </div>
             ))}

             {/* Placeholder for "Add more" */}
             <button onClick={onConnectClick} className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-500 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
                 <Plus className="w-5 h-5" />
                 Desplegar nuevo Agente
             </button>
          </div>

          {/* Right Column: Live Terminal Log */}
          <div className="lg:col-span-1">
              <div className="bg-slate-950 border border-white/10 rounded-xl p-4 h-full min-h-[400px] flex flex-col font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-400 border-b border-white/5 pb-3 mb-3">
                      <Terminal className="w-4 h-4" />
                      <span className="uppercase tracking-widest font-bold">Log Global</span>
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                      <div className="text-slate-500">[11:02:45] <span className="text-blue-400">System</span>: Inicializando worker pool...</div>
                      <div className="text-slate-500">[11:02:48] <span className="text-yellow-400">Agent-01</span>: Navegando a perfil @startup_mx</div>
                      <div className="text-slate-500">[11:03:12] <span className="text-green-400">Success</span>: DM enviado a @startup_mx (Script A)</div>
                      <div className="text-slate-500">[11:03:45] <span className="text-yellow-400">Agent-03</span>: Escribiendo respuesta...</div>
                      <div className="text-slate-500">[11:04:01] <span className="text-purple-400">AI</span>: Sentimiento analizado: POSITIVO</div>
                      <div className="text-slate-500">[11:04:15] <span className="text-blue-400">Proxy</span>: Rotando IP móvil (4G)...</div>
                      <div className="text-slate-500">[11:04:18] <span className="text-slate-300">... Esperando siguiente tarea</span></div>
                      <div className="animate-pulse text-tactical-primary">_</div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};
