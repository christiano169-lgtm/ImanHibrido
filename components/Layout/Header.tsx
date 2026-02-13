import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-tactical-bg/80 border-b border-white/5 py-4 px-6 lg:pl-72 flex items-center justify-between">
      
      {/* Left: Mobile Menu Trigger / Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-400">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-white tracking-tight hidden sm:block">
          Centro de Comando
        </h1>
      </div>

      {/* Center: Tactical Search */}
      <div className="flex-1 max-w-xl px-8 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-tactical-secondary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-full leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-tactical-secondary/50 focus:ring-1 focus:ring-tactical-secondary/50 sm:text-sm transition-all"
            placeholder="Buscar activos, leads o comandos..."
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-2 w-2 h-2 bg-tactical-alert rounded-full animate-pulse"></span>
        </button>

        {/* Status Pills */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-tactical-bg bg-slate-700 overflow-hidden">
                <img src={`https://picsum.photos/32/32?random=${i}`} alt="Agent" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-tactical-bg bg-tactical-surface flex items-center justify-center text-xs font-bold text-white">
              +12
            </div>
          </div>
          <div className="px-3 py-1 bg-tactical-primary/10 border border-tactical-primary/20 rounded-lg">
             <span className="text-xs font-mono text-tactical-primary font-bold">15 ACTIVOS</span>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">James R.</p>
            <p className="text-xs text-tactical-secondary">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
             <img src="https://picsum.photos/40/40?random=100" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};
