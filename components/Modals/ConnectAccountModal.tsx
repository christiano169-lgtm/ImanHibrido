import React, { useState } from 'react';
import { X, Shield, Instagram, Server } from 'lucide-react';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectAccountModal: React.FC<ConnectAccountModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate validation
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Logic to add account would go here in a real app
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-tactical-primary/10">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 flex justify-between items-center border-b border-white/5">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-500" />
            Conectar Cuenta IG
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleConnect} className="p-6 space-y-4">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase">Usuario de Instagram</label>
            <input 
              type="text" 
              placeholder="@usuario" 
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tactical-primary focus:ring-1 focus:ring-tactical-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tactical-primary focus:ring-1 focus:ring-tactical-primary transition-all"
            />
          </div>

          <div className="p-4 bg-tactical-surface rounded-lg border border-white/5 flex items-start gap-3">
             <Shield className="w-5 h-5 text-tactical-primary shrink-0 mt-0.5" />
             <div>
               <p className="text-sm text-white font-medium">Seguridad de Grado Militar</p>
               <p className="text-xs text-slate-400 mt-1">Las credenciales se encriptan con AES-256 antes de guardarse en la bóveda.</p>
             </div>
          </div>

          <div className="pt-2">
             <div className="flex items-center gap-2 mb-2">
               <input type="checkbox" id="proxy" className="rounded bg-slate-700 border-white/20" defaultChecked />
               <label htmlFor="proxy" className="text-sm text-slate-300">Asignar Proxy Móvil 4G Dedicado</label>
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 pl-6">
                <Server className="w-3 h-3" />
                <span>Auto-asignado desde el Pool de EE.UU.</span>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${isLoading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-tactical-primary hover:bg-emerald-400 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                Validando Credenciales...
              </>
            ) : (
              'Inicializar Agente'
            )}
          </button>

        </form>
      </div>
    </div>
  );
};
