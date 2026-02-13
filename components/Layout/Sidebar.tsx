import React from 'react';
import { NAV_ITEMS, SETTINGS_NAV } from '../../constants';
import { Bot } from 'lucide-react';
import { ViewType } from '../../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-tactical-bg border-r border-white/5 flex flex-col justify-between z-50 transition-all duration-300">
      
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="relative">
          <Bot className="w-8 h-8 text-tactical-secondary" />
          <div className="absolute inset-0 bg-tactical-secondary blur-lg opacity-40"></div>
        </div>
        <span className="hidden lg:block font-bold text-xl tracking-tight text-white">
          iman<span className="text-tactical-primary">hibrido</span>
        </span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="hidden lg:block text-xs font-mono text-slate-500 mb-4 px-2">OPERACIONES</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative overflow-hidden text-left ${
              currentView === item.id 
                ? 'text-white bg-white/5' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {/* Active Indicator */}
            {currentView === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-tactical-primary rounded-r-full shadow-[0_0_10px_#10b981]"></div>
            )}
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-tactical-primary' : ''}`} />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Settings Nav */}
      <div className="px-4 py-8 space-y-2 mb-4">
        <p className="hidden lg:block text-xs font-mono text-slate-500 mb-4 px-2">SISTEMA</p>
        {SETTINGS_NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
              currentView === item.id 
                ? 'text-white bg-white/5' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};
