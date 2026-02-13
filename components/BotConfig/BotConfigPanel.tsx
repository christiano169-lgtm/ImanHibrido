import React, { useState } from 'react';
import { Play, X, UserPlus, UserMinus, MessageSquare, Heart, MessageCircle, Settings, Clock, AlertTriangle } from 'lucide-react';

interface BotConfigPanelProps {
  onClose: () => void;
  onStart: (config: any) => void;
}

export const BotConfigPanel: React.FC<BotConfigPanelProps> = ({ onClose, onStart }) => {
  const [targetMode, setTargetMode] = useState<'follower' | 'following' | 'custom'>('follower');
  const [actions, setActions] = useState({
    follow: false,
    unfollow: false,
    dm: true,
    like: false,
    comment: false
  });
  
  // State for limits matching the image
  const [maxUsers, setMaxUsers] = useState(80);
  const [intervalMin, setIntervalMin] = useState(4);
  const [intervalMax, setIntervalMax] = useState(7);
  const [pauseActions, setPauseActions] = useState(9);
  const [pauseMinutes, setPauseMinutes] = useState(45);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#020617] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-slate-900/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-tactical-primary" />
              Configuración de Operación
            </h2>
            <p className="text-xs text-slate-400">Define los parámetros tácticos del agente</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* 1. Target Selection */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-tactical-primary uppercase font-bold">1. Selección de Objetivo</label>
            <div className="flex bg-slate-900 p-1 rounded-lg border border-white/5">
              {(['follower', 'following', 'custom'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTargetMode(mode)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    targetMode === mode 
                      ? 'bg-slate-800 text-white shadow-lg border border-white/10' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {mode === 'follower' && 'Seguidores'}
                  {mode === 'following' && 'Seguidos'}
                  {mode === 'custom' && 'Lista Personalizada'}
                </button>
              ))}
            </div>
            
            <div className="space-y-1">
               <p className="text-xs text-slate-400">Usuario Fuente (Apalancamiento):</p>
               <input 
                 type="text" 
                 placeholder="@competencia_oficial" 
                 className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-tactical-primary focus:ring-1 focus:ring-tactical-primary outline-none transition-all"
               />
            </div>
          </div>

          {/* 2. Actions */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-tactical-primary uppercase font-bold">2. Acciones Tácticas</label>
            <div className="flex flex-wrap gap-3">
               {[
                 { id: 'follow', icon: UserPlus, label: 'Follow' },
                 { id: 'unfollow', icon: UserMinus, label: 'Unfollow' },
                 { id: 'dm', icon: MessageSquare, label: 'DM' },
                 { id: 'like', icon: Heart, label: 'Like' },
                 { id: 'comment', icon: MessageCircle, label: 'Comment' },
               ].map((action) => (
                 <label key={action.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                    // @ts-ignore
                    actions[action.id] 
                      ? 'bg-tactical-primary/10 border-tactical-primary text-white' 
                      : 'bg-slate-900 border-white/10 text-slate-500 hover:border-white/30'
                 }`}>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      // @ts-ignore
                      checked={actions[action.id]}
                      // @ts-ignore
                      onChange={() => setActions(p => ({...p, [action.id]: !p[action.id]}))}
                    />
                    <action.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{action.label}</span>
                 </label>
               ))}
            </div>
          </div>

          {/* 3. DM Configuration */}
          {actions.dm && (
            <div className="space-y-3 p-4 bg-slate-900/30 rounded-xl border border-white/5">
               <div className="flex justify-between">
                  <label className="text-xs font-mono text-slate-300 uppercase">Configuración de Mensaje (Spintax)</label>
                  <span className="text-xs text-tactical-secondary cursor-pointer hover:underline">Bulk Edit</span>
               </div>
               <textarea 
                 rows={4}
                 placeholder="{Hola|Qué tal|Saludos}, vi tu perfil y me pareció interesante..."
                 className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-slate-300 focus:border-tactical-secondary outline-none"
               ></textarea>
               <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-400">
                    <input type="checkbox" className="rounded bg-slate-800 border-white/20" /> Enviar Foto (Opcional)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-400">
                    <input type="checkbox" className="rounded bg-slate-800 border-white/20" /> Compartir Post (Opcional)
                  </label>
               </div>
            </div>
          )}

          {/* 4. Limits & Delays */}
          <div className="space-y-6 pt-2">
             <label className="text-xs font-mono text-tactical-primary uppercase font-bold flex items-center gap-2">
                <Clock className="w-4 h-4" /> 
                3. Límites y Tiempos de Seguridad
             </label>
             
             {/* Max Users Slider */}
             <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-300">
                   <span>Límite Máximo de Usuarios</span>
                   <span className="font-mono text-tactical-primary">{maxUsers}</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="200" 
                  value={maxUsers} 
                  onChange={(e) => setMaxUsers(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-tactical-primary"
                />
             </div>

             {/* Interval Range */}
             <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-300">
                   <span>Rango de Intervalo (Minutos)</span>
                   <span className="font-mono text-tactical-secondary">{intervalMin} - {intervalMax} min</span>
                </div>
                <div className="flex gap-4 items-center">
                   <input 
                      type="range" min="1" max="15" value={intervalMin} 
                      onChange={(e) => setIntervalMin(Math.min(parseInt(e.target.value), intervalMax - 1))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-tactical-secondary"
                   />
                   <input 
                      type="range" min="2" max="30" value={intervalMax} 
                      onChange={(e) => setIntervalMax(Math.max(parseInt(e.target.value), intervalMin + 1))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-tactical-secondary"
                   />
                </div>
             </div>

             {/* Pause Logic */}
             <div className="p-4 bg-tactical-alert/10 border border-tactical-alert/20 rounded-xl flex flex-col md:flex-row items-center gap-4 text-sm">
                <AlertTriangle className="w-5 h-5 text-tactical-alert shrink-0" />
                <div className="flex flex-wrap items-center gap-2 text-slate-300">
                   <span>Pausar cada</span>
                   <input 
                     type="number" 
                     value={pauseActions}
                     onChange={(e) => setPauseActions(parseInt(e.target.value))}
                     className="w-16 bg-slate-900 border border-white/10 rounded px-2 py-1 text-center text-white focus:border-tactical-alert outline-none"
                   />
                   <span>acciones, esperar</span>
                   <input 
                     type="number" 
                     value={pauseMinutes}
                     onChange={(e) => setPauseMinutes(parseInt(e.target.value))}
                     className="w-16 bg-slate-900 border border-white/10 rounded px-2 py-1 text-center text-white focus:border-tactical-alert outline-none"
                   />
                   <span>minutos.</span>
                </div>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900 border-t border-white/5 flex justify-end gap-3">
           <button 
             onClick={onClose}
             className="px-6 py-3 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
           >
             Cancelar
           </button>
           <button 
             onClick={() => onStart({})}
             className="px-8 py-3 rounded-xl font-bold bg-tactical-primary text-slate-900 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
           >
             <Play className="w-4 h-4 fill-current" />
             INICIAR CAMPAÑA
           </button>
        </div>

      </div>
    </div>
  );
};
