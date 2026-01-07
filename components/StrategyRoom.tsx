
import React from 'react';
import { mockPlans } from '../services/mockData';
import { Icons } from '../constants';

const StrategyRoom: React.FC = () => {
  const plan = mockPlans[0];

  return (
    <div className="relative text-white min-h-screen p-6 overflow-hidden select-none animate-in fade-in duration-700">
      <div className="flex justify-between items-start mb-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white flex items-baseline gap-4">
            Strategy Room <span className="text-xs text-pink-500 neon-text">OPERATIONS</span>
          </h1>
          <p className="text-sm text-slate-500">Mapping tactical orbits for organizational success...</p>
        </div>
        <div className="flex gap-4">
          <button className="glass-panel electric-border px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">EXTRACT PDF</button>
          <button className="glass-panel electric-border px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-600/20 hover:bg-blue-600/40 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">DISTRIBUTE PLAN</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Core Directives */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="glass-panel electric-border p-10 rounded-2xl relative float-item">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-10 border-b border-slate-800 pb-4">Tactical Foundation</h3>
            <div className="grid grid-cols-2 gap-12">
               <div className="space-y-4">
                  <div className="text-[10px] font-black text-blue-500 uppercase">Vision Vector</div>
                  <p className="text-sm text-slate-300 italic font-medium leading-relaxed">"{plan.vision}"</p>
               </div>
               <div className="space-y-4">
                  <div className="text-[10px] font-black text-pink-500 uppercase">Mission Payload</div>
                  <p className="text-sm text-slate-300 italic font-medium leading-relaxed">"{plan.mission}"</p>
               </div>
            </div>
          </div>

          <div className="glass-panel electric-border p-10 rounded-2xl float-item" style={{ animationDelay: '1s' }}>
             <h3 className="text-xl font-bold uppercase tracking-widest mb-10 border-b border-slate-800 pb-4">Operational Objectives</h3>
             <div className="space-y-6">
                {plan.objectives.map((obj, i) => (
                   <div key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 glass-panel electric-border rounded-full flex items-center justify-center text-xs font-black text-blue-400 neon-text group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <div className="flex-1 text-sm font-semibold text-slate-200 border-b border-white/5 pb-2">{obj}</div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* AI Orbit Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="glass-panel electric-border p-8 rounded-2xl text-center space-y-8 h-full flex flex-col justify-center">
              <div className="relative w-48 h-48 mx-auto">
                 {/* Multi-ring orbital animation */}
                 <svg className="w-full h-full animate-[spin_20s_linear_infinite]">
                    <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
                    <circle cx="96" cy="96" r="60" fill="none" stroke="rgba(217, 70, 239, 0.1)" strokeWidth="1" />
                    <circle cx="20" cy="96" r="4" fill="#3b82f6" className="neon-glow" />
                    <circle cx="96" cy="30" r="3" fill="#d946ef" className="neon-glow" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white neon-text">88%</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Efficiency</span>
                 </div>
              </div>

              <div className="space-y-4 text-left p-6 glass-panel rounded-xl">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase">AI Strategic Diagnostic</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">
                    System analysis indicates a <span className="text-emerald-400">94% alignment</span> with current market trends. The incubation phase is successfully clearing critical risk thresholds.
                 </p>
                 <button className="w-full py-3 glass-panel electric-border text-[10px] font-black uppercase text-blue-400 hover:text-white transition-colors">SYNC ROADMAP</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyRoom;
