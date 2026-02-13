import React from 'react';
import { Layers, CheckCircle2, Clock, AlertOctagon } from 'lucide-react';

const DEALS = [
  { id: 'TX-9821', item: 'Pack 5x Real Estate Accounts', seller: 'Vendor_X', amount: '$650.00', status: 'completed', date: 'Oct 24' },
  { id: 'TX-9822', item: '1x High Tier Crypto Account', seller: 'AlphaAccounts', amount: '$320.00', status: 'pending', date: 'Oct 25' },
  { id: 'TX-9823', item: 'Proxy 4G Network Access', seller: 'NetMasters', amount: '$120.00', status: 'dispute', date: 'Oct 26' },
];

export const EscrowPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen">
      <div className="mb-8">
         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-tactical-secondary" />
            Tratos en Escrow
         </h2>
         <p className="text-slate-400 text-sm mt-1">Fondos retenidos seguramente hasta la verificación del activo.</p>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-white/5 bg-slate-900/60">
                  <th className="p-4 text-xs font-mono text-slate-500 uppercase">ID Transacción</th>
                  <th className="p-4 text-xs font-mono text-slate-500 uppercase">Item</th>
                  <th className="p-4 text-xs font-mono text-slate-500 uppercase">Vendedor</th>
                  <th className="p-4 text-xs font-mono text-slate-500 uppercase">Monto</th>
                  <th className="p-4 text-xs font-mono text-slate-500 uppercase">Estado</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {DEALS.map((deal) => (
                  <tr key={deal.id} className="hover:bg-white/5 transition-colors">
                     <td className="p-4 text-sm font-mono text-slate-300">{deal.id}</td>
                     <td className="p-4 text-sm text-white font-medium">{deal.item}</td>
                     <td className="p-4 text-sm text-slate-400">{deal.seller}</td>
                     <td className="p-4 text-sm font-mono text-white">{deal.amount}</td>
                     <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                           deal.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                           deal.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                           'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                           {deal.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                           {deal.status === 'pending' && <Clock className="w-3 h-3" />}
                           {deal.status === 'dispute' && <AlertOctagon className="w-3 h-3" />}
                           {deal.status.toUpperCase()}
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
