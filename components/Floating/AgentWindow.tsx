import React, { useEffect, useState, useRef } from 'react';
import { X, Minimize2, Send, Paperclip, MoreVertical, Wifi } from 'lucide-react';
import { ActiveAgent } from '../../types';

interface AgentWindowProps {
  agent: ActiveAgent;
  onClose: () => void;
  index: number;
}

export const AgentWindow: React.FC<AgentWindowProps> = ({ agent, onClose, index }) => {
  const [messages, setMessages] = useState<{sender: 'me'|'them', text: string}[]>([
    { sender: 'me', text: 'Hola, vi tu perfil y me pareció interesante tu enfoque en eCommerce.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation of live chat
  useEffect(() => {
    const timer1 = setTimeout(() => setIsTyping(true), 1500);
    const timer2 = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { sender: 'them', text: 'Hola! Muchas gracias, estamos trabajando duro.' }]);
    }, 4500);
    
    const timer3 = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'me', text: 'Genial. Tienes 5 minutos para una llamada rápida?' }]);
    }, 7000);

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Calculate position based on index to stack them
  const bottomOffset = 20;
  const rightOffset = 20 + (index * 340); // Stack horizontally or use different logic

  return (
    <div 
      className="fixed bottom-4 z-50 w-80 bg-slate-950 border border-white/10 rounded-t-xl shadow-2xl overflow-hidden flex flex-col font-sans"
      style={{ right: `${rightOffset}px`, height: '400px' }}
    >
      {/* Header */}
      <div className="bg-slate-900 p-3 border-b border-white/5 flex justify-between items-center cursor-move">
        <div className="flex items-center gap-2">
            <div className="relative">
                 <img src={agent.avatar_url} className="w-8 h-8 rounded-full" alt="bot" />
                 <div className="absolute -bottom-1 -right-1 bg-tactical-bg rounded-full p-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 </div>
            </div>
            <div>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                    {agent.target_account}
                    <Wifi className="w-3 h-3 text-tactical-primary" />
                </p>
                <p className="text-[10px] text-slate-400">Agente: {agent.name}</p>
            </div>
        </div>
        <div className="flex gap-1">
            <button className="p-1 hover:bg-white/10 rounded text-slate-400"><Minimize2 className="w-3 h-3" /></button>
            <button onClick={onClose} className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded text-slate-400"><X className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-black/40 p-4 overflow-y-auto space-y-3" ref={scrollRef}>
         <div className="text-center text-[10px] text-slate-600 my-2">-- INICIO DE SECUENCIA --</div>
         {messages.map((m, i) => (
             <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[80%] p-2 rounded-lg text-xs ${
                     m.sender === 'me' 
                     ? 'bg-tactical-primary/20 text-emerald-100 border border-tactical-primary/20 rounded-br-none' 
                     : 'bg-slate-800 text-slate-200 border border-white/5 rounded-bl-none'
                 }`}>
                     {m.text}
                 </div>
             </div>
         ))}
         {isTyping && (
             <div className="flex justify-start">
                 <div className="bg-slate-800 p-2 rounded-lg rounded-bl-none flex gap-1 items-center h-8">
                     <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                     <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                 </div>
             </div>
         )}
      </div>

      {/* Input Simulation */}
      <div className="p-3 bg-slate-900 border-t border-white/5 flex gap-2 items-center opacity-50 pointer-events-none">
          <Paperclip className="w-4 h-4 text-slate-500" />
          <div className="flex-1 h-8 bg-slate-950 rounded border border-white/5"></div>
          <Send className="w-4 h-4 text-slate-500" />
      </div>
      
      {/* Overlay indicating automated control */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-tactical-primary/10 flex items-center justify-center text-[10px] text-tactical-primary font-mono font-bold backdrop-blur-sm">
          CONTROL AUTOMATIZADO ACTIVO
      </div>
    </div>
  );
};
