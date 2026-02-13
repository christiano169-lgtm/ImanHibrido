import React from 'react';
import { Activity, Shield, Wifi, AlertTriangle, Battery, BatteryMedium, BatteryCharging } from 'lucide-react';
import { VaultAccount, AccountStatus } from '../../types';

const SWARM_ACCOUNTS: Partial<VaultAccount>[] = [
  { id: '1', ig_username: '@growth_agent_01', status: AccountStatus.BUSY, daily_limit: 50, current_usage: 42, health_score: 98, proxy_ip: '192.168.1.12' },
  { id: '2', ig_username: '@growth_agent_02', status: AccountStatus.AVAILABLE, daily_limit: 50, current_usage: 12, health_score: 100, proxy_ip: '192.168.1.15' },
  { id: '3', ig_username: '@growth_agent_03', status: AccountStatus.COOLDOWN, daily_limit: 50, current_usage: 48, health_score: 92, proxy_ip: '192.168.1.18' },
  { id: '4', ig_username: '@growth_agent_04', status: AccountStatus.DEAD, daily_limit: 50, current_usage: 5, health_score: 0, proxy_ip: '10.0.0.5' },
  { id: '5', ig_username: '@growth_agent_05', status: AccountStatus.BUSY, daily_limit: 50, current_usage: 25, health_score: 99, proxy_ip: '192.168.1.22' },
  { id: '6', ig_username: '@growth_agent_06', status: AccountStatus.AVAILABLE, daily_limit: 50, current_usage: 0, health_score: 100, proxy_ip: '192.168.1.25' },
];

export const WarRoom: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
         <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <Activity className="w-6 h-6 text-tactical-alert animate-pulse" />
               War Room: Enjambre Activo
            </h2>
            <p className="text-sm text-slate-400">Visualización de Balanceo de Carga y Salud de Proxies.</p>
         </div>
         <div className="flex gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Operativo
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Cooldown
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Fallo Crítico
            </div>
         </div>
      </div>

      {/* Grid of Operatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto custom-scrollbar p-1">
         {SWARM_ACCOUNTS.map((acc) => {
            const usagePercent = (acc.current_usage! / acc.daily_limit!) * 100;
            const isCritical = acc.status === AccountStatus.DEAD;
            
            return (
               <div key={acc.id} className={`relative bg-slate-900/60 border ${isCritical ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/5'} rounded-xl p-4 overflow-hidden group`}>
                  
                  {/* Status Bar */}
                  <div className={`absolute top-0 left-0 h-1 transition-all duration-1000 ${
                     acc.status === AccountStatus.BUSY ? 'bg-emerald-500 w-full animate-pulse' :
                     acc.status === AccountStatus.COOLDOWN ? 'bg-yellow-500 w-full' :
                     acc.status === AccountStatus.DEAD ? 'bg-red-500 w-full' : 'bg-slate-700 w-full'
                  }`}></div>

                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/10 ${isCritical ? 'text-red-500' : 'text-slate-300'}`}>
                           {isCritical ? <AlertTriangle className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                        </div>
                        <div>
                           <h4 className={`text-sm font-bold font-mono ${isCritical ? 'text-red-400' : 'text-white'}`}>{acc.ig_username}</h4>
                           <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <Wifi className="w-3 h-3" />
                              <span>{acc.proxy_ip}</span>
                           </div>
                        </div>
                     </div>
                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        acc.status === AccountStatus.BUSY ? 'bg-emerald-500/20 text-emerald-400' :
                        acc.status === AccountStatus.COOLDOWN ? 'bg-yellow-500/20 text-yellow-400' :
                        acc.status === AccountStatus.DEAD ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                     }`}>
                        {acc.status}
                     </span>
                  </div>

                  {/* Load Metrics */}
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] text-slate-400 uppercase font-mono">
                        <span>Carga Diaria</span>
                        <span>{acc.current_usage} / {acc.daily_limit}</span>
                     </div>
                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                           className={`h-full rounded-full ${usagePercent > 90 ? 'bg-red-500' : 'bg-tactical-primary'}`}
                           style={{ width: `${usagePercent}%` }}
                        ></div>
                     </div>
                  </div>

                  {/* Terminal Output Simulation */}
                  <div className="mt-4 p-2 bg-black/40 rounded border border-white/5 h-16 overflow-hidden font-mono text-[10px] text-slate-500 leading-tight">
                     {acc.status === AccountStatus.BUSY && (
                        <>
                           <div className="text-emerald-500/80">> Enviando DM a @lead_{Math.floor(Math.random()*999)}...</div>
                           <div className="text-slate-600">... Esperando random delay (45s)</div>
                        </>
                     )}
                     {acc.status === AccountStatus.COOLDOWN && (
                        <div className="text-yellow-500/80">> Límite horario alcanzado. Enfriando motor por 15m...</div>
                     )}
                     {acc.status === AccountStatus.DEAD && (
                        <div className="text-red-500">> ERROR: Challenge detectado. Cuenta aislada.</div>
                     )}
                     {acc.status === AccountStatus.AVAILABLE && (
                        <div className="text-slate-600">> En espera de asignación del Orquestador...</div>
                     )}
                  </div>

               </div>
            );
         })}
      </div>
    </div>
  );
};