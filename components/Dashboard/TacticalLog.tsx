import React from 'react';
import { Terminal } from 'lucide-react';

export const TacticalLog: React.FC = () => {
  const logs = [
    { time: '10:51', msg: 'Rotación de Proxy iniciada. IP: 192.168.x.x', type: 'info' },
    { time: '10:52', msg: 'Secuencia de calentamiento completada: Cuenta #982', type: 'success' },
    { time: '10:54', msg: 'Oráculo (Gemini 1.5) analizando lote de leads...', type: 'ai' },
    { time: '10:55', msg: 'Alerta: Challenge de Login en Cuenta #112. Pausando.', type: 'warn' },
  ];

  return (
    <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 font-mono text-xs overflow-hidden h-full">
      <div className="flex items-center gap-2 mb-4 text-slate-400 border-b border-white/5 pb-2">
        <Terminal className="w-4 h-4" />
        <span className="uppercase tracking-widest">Log del Sistema</span>
      </div>
      <div className="space-y-3">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-slate-600">{log.time}</span>
            <span className={`
              ${log.type === 'info' ? 'text-slate-300' : ''}
              ${log.type === 'success' ? 'text-tactical-primary' : ''}
              ${log.type === 'ai' ? 'text-tactical-secondary animate-pulse' : ''}
              ${log.type === 'warn' ? 'text-tactical-alert' : ''}
            `}>
              {log.type === 'ai' && '> '}
              {log.msg}
            </span>
          </div>
        ))}
        <div className="flex gap-3">
            <span className="text-slate-600">10:56</span>
            <span className="text-slate-500 animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};
