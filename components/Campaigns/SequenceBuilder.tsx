import React, { useState } from 'react';
import { MessageSquare, Clock, GitBranch, Trash2, Plus, AlertCircle, Zap } from 'lucide-react';
import { SequenceNode } from '../../types';

export const SequenceBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<SequenceNode[]>([
    { id: '1', type: 'message', content: '{Hola|Qué tal|Saludos} [First_Name], vi tu perfil y me pareció interesante tu enfoque en [Niche].' },
    { id: '2', type: 'delay', delayMinutes: 1440, delayJitter: 120 }, // 24h + jitter
    { id: '3', type: 'condition', condition: 'IF_REPLIED_STOP_ELSE_CONTINUE' },
    { id: '4', type: 'message', content: '¿Pudiste ver el mensaje anterior? Solo quería asegurarme de no ser inoportuno.' },
  ]);

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
           <h3 className="text-lg font-bold text-white flex items-center gap-2">
             <GitBranch className="w-5 h-5 text-tactical-secondary" />
             Constructor de Secuencias (Drip)
           </h3>
           <p className="text-xs text-slate-400">Define el flujo lógico. El "Kill Switch" se activa automáticamente al recibir respuesta.</p>
        </div>
        <button className="text-xs flex items-center gap-1 bg-tactical-primary/10 text-tactical-primary px-3 py-1 rounded border border-tactical-primary/20">
           <Zap className="w-3 h-3" /> Test Spintax
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-0 relative custom-scrollbar">
         {/* Vertical Line Connector */}
         <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-800 -z-10"></div>

         {nodes.map((node, index) => (
           <div key={node.id} className="relative pl-14 pb-8 group">
             
             {/* Icon Indicator */}
             <div className={`absolute left-2 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 bg-slate-950 ${
                node.type === 'message' ? 'border-tactical-primary text-tactical-primary' :
                node.type === 'delay' ? 'border-yellow-500 text-yellow-500' :
                'border-purple-500 text-purple-500'
             }`}>
                {node.type === 'message' && <MessageSquare className="w-4 h-4" />}
                {node.type === 'delay' && <Clock className="w-4 h-4" />}
                {node.type === 'condition' && <GitBranch className="w-4 h-4" />}
             </div>

             {/* Node Content */}
             <div className="bg-slate-900 border border-white/10 p-4 rounded-xl hover:border-white/30 transition-all group-hover:shadow-lg">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-mono font-bold uppercase text-slate-400">
                      Paso {index + 1}: {node.type === 'message' ? 'Mensaje' : node.type === 'delay' ? 'Espera Inteligente' : 'Condición Lógica'}
                   </span>
                   <button className="text-slate-600 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>

                {/* Body */}
                {node.type === 'message' && (
                   <div className="space-y-2">
                      <textarea 
                        className="w-full bg-black/30 border border-white/5 rounded-lg p-2 text-sm text-slate-300 focus:border-tactical-primary outline-none font-mono"
                        rows={3}
                        defaultValue={node.content}
                      />
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                         <span className="bg-white/5 px-1.5 py-0.5 rounded">Spintax Activado</span>
                         <span className="bg-white/5 px-1.5 py-0.5 rounded">Variables: [Name], [Niche]</span>
                      </div>
                   </div>
                )}

                {node.type === 'delay' && (
                   <div className="flex items-center gap-4 bg-black/30 p-2 rounded-lg border border-white/5">
                      <div>
                         <label className="text-[10px] text-slate-500 uppercase block">Espera Base</label>
                         <span className="text-yellow-400 font-mono font-bold">24 Horas</span>
                      </div>
                      <div className="text-slate-600">+</div>
                      <div>
                         <label className="text-[10px] text-slate-500 uppercase block">Factor Jitter (Random)</label>
                         <span className="text-slate-300 font-mono">+/- 120 min</span>
                      </div>
                      <div className="ml-auto text-xs text-slate-500 italic">
                         Simula comportamiento humano irregular.
                      </div>
                   </div>
                )}

                {node.type === 'condition' && (
                   <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-purple-400" />
                      <div>
                         <p className="text-sm text-purple-200 font-bold">KILL SWITCH (Interruptor de Corte)</p>
                         <p className="text-xs text-purple-300/70">Si el lead responde, la secuencia se detiene y se mueve a Inbox Humano.</p>
                      </div>
                   </div>
                )}

             </div>

             {/* Add Button Connector */}
             <div className="absolute left-[22px] bottom-0 transform translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-slate-800 border border-white/20 rounded-full p-1 text-slate-400 hover:text-white hover:bg-tactical-primary">
                   <Plus className="w-3 h-3" />
                </button>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
};
