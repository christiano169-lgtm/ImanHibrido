import React from 'react';
import { Search, MoreHorizontal, Send } from 'lucide-react';

const CHATS = [
  { id: 1, user: '@juan.perez_ceo', lastMsg: 'Me interesa la propuesta, ¿podemos hablar?', time: '10:42', unread: true },
  { id: 2, user: '@startup_latam', lastMsg: 'Gracias por la info.', time: '09:15', unread: false },
  { id: 3, user: '@marta.marketing', lastMsg: '¿Tienen disponibilidad para la próxima semana?', time: 'Ayer', unread: false },
  { id: 4, user: '@crypto_king', lastMsg: 'Precio?', time: 'Ayer', unread: false },
];

export const CRMPage: React.FC = () => {
  return (
    <div className="flex h-screen pt-20 lg:pt-0 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r border-white/5 bg-slate-900/30 flex flex-col">
         <div className="p-4 border-b border-white/5">
            <h2 className="text-lg font-bold text-white mb-4">Inbox Unificado</h2>
            <div className="relative">
               <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
               <input 
                  type="text" 
                  placeholder="Buscar conversación..." 
                  className="w-full bg-slate-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-tactical-primary outline-none"
               />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            {CHATS.map((chat) => (
               <div key={chat.id} className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${chat.id === 1 ? 'bg-white/5' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                     <span className={`font-medium text-sm ${chat.unread ? 'text-white' : 'text-slate-400'}`}>{chat.user}</span>
                     <span className="text-xs text-slate-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
               </div>
            ))}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950/50">
         <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/30">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10"></div>
               <div>
                  <h3 className="text-white font-bold text-sm">@juan.perez_ceo</h3>
                  <p className="text-xs text-emerald-400">Lead Calificado (Oráculo: 85%)</p>
               </div>
            </div>
            <button className="text-slate-400 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
         </div>

         <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-end">
               <div className="bg-tactical-primary/20 border border-tactical-primary/20 text-emerald-100 p-3 rounded-xl rounded-br-none max-w-md text-sm">
                  Hola Juan, vi que estás escalando tu agencia. Tenemos una estrategia de outbound que podría interesarte.
               </div>
            </div>
            <div className="flex justify-start">
               <div className="bg-slate-800 border border-white/5 text-slate-300 p-3 rounded-xl rounded-bl-none max-w-md text-sm">
                  Me interesa la propuesta, ¿podemos hablar?
               </div>
            </div>
         </div>

         <div className="p-4 border-t border-white/5 bg-slate-900/30">
            <div className="flex gap-2">
               <input 
                  type="text" 
                  placeholder="Escribe un mensaje..." 
                  className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-tactical-primary outline-none"
               />
               <button className="p-3 bg-tactical-primary text-slate-900 rounded-lg hover:bg-emerald-400 transition-colors">
                  <Send className="w-4 h-4" />
               </button>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto">
               <button className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400 border border-white/5 hover:border-tactical-primary/50 whitespace-nowrap">
                  ✨ Sugerencia IA: "Claro, agenda aquí..."
               </button>
               <button className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400 border border-white/5 hover:border-tactical-primary/50 whitespace-nowrap">
                  ✨ Sugerencia IA: "¿Te va bien mañana?"
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
