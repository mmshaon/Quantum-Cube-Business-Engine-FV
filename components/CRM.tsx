
import React, { useState } from 'react';
import { Icons } from '../constants';

const CRM: React.FC = () => {
  const [pipeline] = useState([
    { name: 'Identified', leads: 42, color: 'bg-blue-500' },
    { name: 'Qualified', leads: 28, color: 'bg-cyan-500' },
    { name: 'Proposal', leads: 15, color: 'bg-pink-500' },
    { name: 'Negotiation', leads: 8, color: 'bg-amber-500' },
    { name: 'Closed', leads: 21, color: 'bg-emerald-500' },
  ]);

  const contacts = [
    { name: 'Sarah Jenkins', role: 'CTO @ Nexus', score: 92, status: 'Hot Lead' },
    { name: 'Mark Wu', role: 'Operations @ Hyperion', score: 78, status: 'Qualified' },
    { name: 'Alex Rivera', role: 'Procurement @ Cyber', score: 45, status: 'Cold' },
    { name: 'Elena Vance', role: 'CEO @ Vance Sol', score: 98, status: 'Customer' },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500 uppercase">
            Relational Matrix
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Dynamic Lead Conversion Core</p>
        </div>
        <div className="flex gap-4">
           <button className="glass-panel electric-border px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/5">
              <Icons.Plus size={16} /> New Contact
           </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
         {/* Pipeline Stage Visualization */}
         <div className="col-span-12 glass-panel electric-border p-10 rounded-[3rem] overflow-hidden">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-12">Conversion Pipeline Flow</h3>
            <div className="flex items-end gap-2 h-64">
               {pipeline.map((stage, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                     <div className="w-full flex justify-center mb-4">
                        <span className="text-2xl font-black mono-font text-white">{stage.leads}</span>
                     </div>
                     <div className={`w-full ${stage.color} opacity-40 group-hover:opacity-80 transition-all rounded-t-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)]`} 
                          style={{ height: `${stage.leads * 2 + 20}%` }} />
                     <div className="w-full h-1 bg-white/10 mt-4 rounded-full" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-4">{stage.name}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Contact Spectrum */}
         <div className="col-span-12 lg:col-span-7 glass-panel electric-border p-8 rounded-[2.5rem] min-h-[400px]">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Active Opportunities</h3>
               <span className="text-[9px] font-black text-cyan-400 mono-font border border-cyan-500/30 px-3 py-1 rounded">24 ACTIVE</span>
            </div>
            <div className="space-y-6">
               {contacts.map((c, i) => (
                  <div key={i} className="glass-panel p-6 rounded-3xl flex items-center gap-6 hover:bg-white/5 transition-all group cursor-pointer">
                     <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xl">
                        {c.name[0]}
                     </div>
                     <div className="flex-1">
                        <h4 className="text-base font-black text-white heading-font">{c.name}</h4>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{c.role}</p>
                     </div>
                     <div className="text-right">
                        <div className="text-lg font-black text-cyan-400 mono-font">{c.score}%</div>
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{c.status}</div>
                     </div>
                     <div className="p-3 bg-white/5 rounded-xl text-slate-600 group-hover:text-cyan-400 transition-colors">
                        <Icons.ChevronRight size={18} />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Support Node */}
         <div className="col-span-12 lg:col-span-5 space-y-8">
            <div className="glass-panel electric-border p-8 rounded-[2.5rem] bg-pink-600/5">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-pink-500/20 rounded-xl"><Icons.ShieldCheck className="text-pink-400" size={24} /></div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-pink-400">Churn Risk Monitor</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                     <span>Global Health</span>
                     <span className="text-pink-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-pink-500" style={{ width: '92%' }} />
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-bold uppercase tracking-widest">AI Prediction: 3 nodes require immediate engagement artifacts.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CRM;
