import React from 'react';
import { Search, Filter, ShieldCheck, ShoppingCart } from 'lucide-react';

const ACCOUNTS = [
  { id: 1, niche: 'Real Estate', followers: '12.5k', age: '3 years', price: 150, risk: 'Low' },
  { id: 2, niche: 'Crypto / Forex', followers: '5.2k', age: '1.5 years', price: 85, risk: 'Medium' },
  { id: 3, niche: 'E-commerce', followers: '28.1k', age: '5 years', price: 320, risk: 'Low' },
  { id: 4, niche: 'Health & Fitness', followers: '8.9k', age: '2 years', price: 110, risk: 'Low' },
  { id: 5, niche: 'Luxury Travel', followers: '15.4k', age: '2.8 years', price: 195, risk: 'Low' },
  { id: 6, niche: 'Tech & AI', followers: '3.2k', age: '1 year', price: 60, risk: 'High' },
];

export const VaultPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            La Bóveda
            <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/10 font-normal">Marketplace</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">Cuentas envejecidas verificadas con Escrow integrado.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-slate-300 hover:text-white transition-all">
              <Filter className="w-4 h-4" /> Filtros
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACCOUNTS.map((acc) => (
           <div key={acc.id} className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:border-tactical-primary/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                 <ShieldCheck className={`w-5 h-5 ${acc.risk === 'Low' ? 'text-emerald-500' : acc.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`} />
              </div>
              
              <div className="mb-4">
                 <p className="text-xs text-slate-500 uppercase font-mono mb-1">NICHO</p>
                 <h3 className="text-xl font-bold text-white">{acc.niche}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div>
                    <p className="text-xs text-slate-500 mb-1">Seguidores</p>
                    <p className="font-mono text-white">{acc.followers}</p>
                 </div>
                 <div>
                    <p className="text-xs text-slate-500 mb-1">Antigüedad</p>
                    <p className="font-mono text-white">{acc.age}</p>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                 <span className="text-2xl font-bold text-tactical-primary">${acc.price}</span>
                 <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-tactical-primary hover:text-slate-900 rounded-lg text-sm font-medium transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <ShoppingCart className="w-4 h-4" /> Comprar
                 </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};
