
import React, { useState } from 'react';
import { Icons } from '../constants';

const SupplyChain: React.FC = () => {
  const [suppliers] = useState([
    { name: 'Cyberdyne Systems', code: 'V-001', rating: 4.8, status: 'Verified' },
    { name: 'Stark Industries', code: 'V-002', rating: 4.9, status: 'Priority' },
    { name: 'Oscorp Chemical', code: 'V-003', rating: 3.2, status: 'Review' },
    { name: 'Weyland-Yutani', code: 'V-004', rating: 4.5, status: 'Verified' },
  ]);

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500 uppercase">
            Supply Chain Hub
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Procure-to-Pay Intelligence Node</p>
        </div>
        <div className="flex gap-6 items-center">
           <div className="text-right">
              <div className="text-[9px] font-black text-slate-500 uppercase">Active Shipments</div>
              <div className="text-3xl font-black text-white mono-font">12</div>
           </div>
           <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg"><Icons.Plus className="text-white" /></div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Logistics Monitoring */}
        <div className="col-span-12 lg:col-span-7 glass-panel electric-border p-10 rounded-[3rem] min-h-[400px] flex flex-col relative overflow-hidden group">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-10">Inbound Logistics Matrix</h3>
          <div className="flex-1 space-y-6">
            {[
              { id: 'SH-102', from: 'Shanghai Node', eta: '2 Days', progress: 65, status: 'In Transit' },
              { id: 'SH-105', from: 'Rotterdam Hub', eta: '5 Days', progress: 30, status: 'In Transit' },
              { id: 'SH-109', from: 'Silicon Valley', eta: '8 Hours', progress: 95, status: 'Approaching' },
            ].map((shipment, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <Icons.Truck className="text-teal-400" size={18} />
                    <span className="text-sm font-black text-white mono-font">{shipment.id}</span>
                  </div>
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">{shipment.eta}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 shadow-[0_0_10px_#14b8a6]" style={{ width: `${shipment.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                    <span>{shipment.from}</span>
                    <span>{shipment.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 right-0 p-10 opacity-5 pointer-events-none">
            <Icons.Truck size={120} />
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="glass-panel electric-border p-8 rounded-[3rem]">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Vendor Scoring</h3>
            <div className="space-y-6">
              {suppliers.map((s, i) => (
                <div key={i} className="flex items-center gap-6 group hover:translate-x-2 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-white group-hover:bg-teal-600 transition-all">
                    {s.name[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{s.name}</h4>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <div key={star} className={`w-1 h-3 rounded-full ${star <= Math.floor(s.rating) ? 'bg-teal-500' : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-600 mono-font">{s.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border ${s.status === 'Priority' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-500/10 border-white/5 text-slate-500'}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel electric-border p-8 rounded-[3rem] bg-teal-600/5 flex flex-col items-center justify-center text-center">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Procurement Health</h3>
            <div className="text-5xl font-black text-teal-400 mono-font italic mb-4">98.4<span className="text-white text-2xl">%</span></div>
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">3-Way Matching Integrity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;
