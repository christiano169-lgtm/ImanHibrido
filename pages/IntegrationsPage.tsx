import React, { useState } from 'react';
import { Network, Plus, Check, Copy, AlertCircle, Play } from 'lucide-react';
import { WebhookConfig } from '../types';

export const IntegrationsPage: React.FC = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    { id: '1', name: 'Notificar a Slack (Canal #leads)', url: 'https://hooks.slack.com/services/T000/B000/XXXX', events: ['new_reply'], isActive: true },
    { id: '2', name: 'HubSpot Create Deal', url: 'https://api.hubapi.com/crm/v3/...', events: ['positive_interest'], isActive: true },
  ]);

  const [testPayload, setTestPayload] = useState(JSON.stringify({
    event: "positive_interest",
    timestamp: new Date().toISOString(),
    data: {
      lead: { username: "@ceo_target", intent_score: 0.89 },
      conversation: { reply_received: "Sí, envíame info." },
      operative: { account_used: "@agent_04" }
    }
  }, null, 2));

  return (
    <div className="p-6 lg:p-8 min-h-screen space-y-8">
      <div className="border-b border-white/5 pb-6">
         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-tactical-secondary" />
            Integraciones & Webhooks
         </h2>
         <p className="text-slate-400 text-sm mt-1">Conecta el cerebro de imanhibrido2.0 con Make, n8n, Zapier o tu CRM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Left: Webhook List */}
         <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold text-white">Endpoints Activos</h3>
               <button className="text-xs flex items-center gap-2 bg-slate-800 text-white px-3 py-2 rounded-lg border border-white/10 hover:bg-slate-700">
                  <Plus className="w-3 h-3" /> Nuevo Webhook
               </button>
            </div>

            <div className="space-y-4">
               {webhooks.map((wh) => (
                  <div key={wh.id} className="bg-slate-900/50 border border-white/10 p-4 rounded-xl hover:border-tactical-secondary/30 transition-all group">
                     <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${wh.isActive ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`}></div>
                           <h4 className="font-bold text-white">{wh.name}</h4>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" checked={wh.isActive} readOnly className="sr-only peer" />
                           <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-tactical-secondary"></div>
                        </label>
                     </div>
                     
                     <div className="bg-black/30 p-2 rounded border border-white/5 flex items-center justify-between mb-3">
                        <code className="text-[10px] text-slate-500 truncate font-mono w-full">{wh.url}</code>
                        <button className="text-slate-500 hover:text-white ml-2"><Copy className="w-3 h-3" /></button>
                     </div>

                     <div className="flex gap-2">
                        {wh.events.map(ev => (
                           <span key={ev} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-white/5 uppercase font-mono">
                              {ev.replace('_', ' ')}
                           </span>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Right: Payload Preview & Test */}
         <div className="bg-slate-950 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[500px]">
             <div className="bg-slate-900 p-4 border-b border-white/5 flex justify-between items-center">
                <span className="text-sm font-mono text-slate-300">Payload Preview (JSON)</span>
                <button className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1">
                   <Play className="w-3 h-3" /> Enviar Test
                </button>
             </div>
             <div className="flex-1 p-0">
                <textarea 
                   value={testPayload}
                   onChange={(e) => setTestPayload(e.target.value)}
                   className="w-full h-full bg-transparent text-xs font-mono text-blue-300 p-4 outline-none resize-none"
                   spellCheck={false}
                />
             </div>
             <div className="bg-slate-900/50 p-3 border-t border-white/5 text-[10px] text-slate-500 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                Los eventos se envían vía POST con firma HMAC-SHA256 en el header.
             </div>
         </div>

      </div>
    </div>
  );
};
