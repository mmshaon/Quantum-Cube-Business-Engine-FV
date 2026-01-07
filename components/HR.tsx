
import React, { useState } from 'react';
import { Icons } from '../constants';

const HR: React.FC = () => {
  const [employees] = useState([
    { name: 'Dr. Aris Thorne', dept: 'R&D Lab', status: 'In Office', hours: 42, bio: 98 },
    { name: 'Leila Kincaid', dept: 'Fiscal Core', status: 'Remote', hours: 38, bio: 85 },
    { name: 'Soren Vane', dept: 'Nexus Operations', status: 'On Leave', hours: 0, bio: 72 },
    { name: 'Mira Solis', dept: 'Marketing Hub', status: 'In Office', hours: 45, bio: 94 },
  ]);

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 uppercase">
            Human Capital Spectrum
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Bio-Metric Lifecycle Synchronization</p>
        </div>
        <div className="flex gap-6 items-center">
           <div className="text-right">
              <div className="text-[9px] font-black text-slate-500 uppercase">Total Personnel</div>
              <div className="text-3xl font-black text-white mono-font">1,402</div>
           </div>
           <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center shadow-lg"><Icons.Plus className="text-white" /></div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
         {/* Employee Directory Cluster */}
         <div className="col-span-12 lg:col-span-8 glass-panel electric-border p-10 rounded-[3rem]">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">Personnel Bio-Sync</h3>
               <div className="flex gap-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black rounded border border-emerald-500/30">92% ONLINE</span>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {employees.map((e, i) => (
                  <div key={i} className="glass-panel p-6 rounded-[2rem] border border-white/5 hover:bg-white/5 transition-all flex flex-col gap-6 group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-full border-2 border-white/10 overflow-hidden group-hover:border-pink-500 transition-all">
                           <img src={`https://picsum.photos/80/80?random=${i}`} alt="Avatar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                           <h4 className="text-base font-black text-white heading-font">{e.name}</h4>
                           <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{e.dept}</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                           <span className={`text-[8px] font-black uppercase ${e.status === 'In Office' ? 'text-emerald-400' : 'text-slate-500'}`}>{e.status}</span>
                           <div className={`w-1.5 h-1.5 rounded-full mt-1 ${e.status === 'In Office' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-700'}`} />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                           <span>Bio-Metric Health</span>
                           <span className="text-blue-400 mono-font">{e.bio}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-blue-600 to-pink-500" style={{ width: `${e.bio}%` }} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Payroll and Funnel */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="glass-panel electric-border p-10 rounded-[3rem] text-center space-y-8">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Recruitment Funnel</h3>
               <div className="flex flex-col gap-2 items-center">
                  <div className="w-40 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 text-[10px] font-black">124 CANDIDATES</div>
                  <div className="w-32 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30 text-[10px] font-black">42 INTERVIEWS</div>
                  <div className="w-24 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center border border-pink-500/30 text-[10px] font-black">12 OFFERS</div>
                  <div className="w-16 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center border border-emerald-500/30 text-[10px] font-black">5 HIRED</div>
               </div>
            </div>

            <div className="glass-panel electric-border p-10 rounded-[3rem] bg-indigo-600/5">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-indigo-500/20 rounded-xl"><Icons.Finance className="text-indigo-400" size={24} /></div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">Payroll Cycle</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                     <span>Current Cycle Progress</span>
                     <span className="text-emerald-400">74%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500" style={{ width: '74%' }} />
                  </div>
                  <button className="w-full py-4 glass-panel border border-indigo-500/30 text-[10px] font-black uppercase text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">Execute Disbursements</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HR;
