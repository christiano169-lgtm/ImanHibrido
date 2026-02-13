import React, { useState } from 'react';
import { Play, Pause, Settings2 } from 'lucide-react';
import { SequenceBuilder } from '../components/Campaigns/SequenceBuilder';
import { WarRoom } from '../components/Campaigns/WarRoom';

export const CampaignsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orchestrator' | 'builder'>('orchestrator');

  return (
    <div className="p-6 lg:p-8 min-h-screen flex flex-col space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
           <h2 className="text-2xl font-bold text-white tracking-tight">Gestión de Campañas</h2>
           <p className="text-slate-400 text-sm mt-1">Campaña Activa: <span className="text-tactical-primary font-mono">OUTBOUND_REALTORS_Q4</span></p>
        </div>
        <div className="flex gap-3">
           <div className="bg-slate-900 border border-white/10 rounded-lg p-1 flex">
              <button 
                onClick={() => setActiveTab('orchestrator')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orchestrator' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Orquestador (War Room)
              </button>
              <button 
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'builder' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Constructor de Secuencias
              </button>
           </div>
           
           <button className="flex items-center gap-2 px-5 py-2 bg-tactical-primary text-slate-900 font-bold rounded-lg hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Play className="w-4 h-4 fill-current" /> Play
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
         {activeTab === 'builder' && <SequenceBuilder />}
         {activeTab === 'orchestrator' && <WarRoom />}
      </div>

    </div>
  );
};
