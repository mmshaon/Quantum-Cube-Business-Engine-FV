
import React, { useState } from 'react';
import { Icons } from '../constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const Marketing: React.FC = () => {
  const [campaigns] = useState([
    { name: 'Quantum Launch', budget: 120000, reach: '1.2M', roi: '+124%', status: 'Active' },
    { name: 'APAC Expansion', budget: 45000, reach: '450k', roi: '+42%', status: 'Active' },
    { name: 'Series B Teaser', budget: 8500, reach: '85k', roi: '--', status: 'Scheduled' },
  ]);

  const leadScoringData = [
    { name: 'Cold', value: 450, color: '#94a3b8' },
    { name: 'Warm', value: 240, color: '#3b82f6' },
    { name: 'Hot', value: 120, color: '#f97316' },
    { name: 'SQL', value: 42, color: '#10b981' },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 uppercase">
            Marketing Matrix
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Campaign ROI & Attribution Core</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-end border-pink-500/20">
            <span className="text-[9px] font-black text-slate-500 uppercase">Total Campaign ROI</span>
            <span className="text-xl font-black text-pink-400 mono-font">852%</span>
          </div>
          <button className="bg-pink-600/20 border border-pink-500/30 p-4 rounded-2xl hover:bg-pink-600/40 transition-all">
            <Icons.Plus className="text-pink-400" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Lead Scoring Visualization */}
        <div className="col-span-12 lg:col-span-5 glass-panel electric-border p-10 rounded-[3rem] h-[400px] flex flex-col items-center justify-center">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-8">Lead Distribution Spectrum</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadScoringData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {leadScoringData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#02001a', border: '1px solid #ffffff10' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-white mono-font">852</span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total Leads</span>
            </div>
          </div>
          <div className="flex gap-6 mt-8">
             {leadScoringData.map((d, i) => (
               <div key={i} className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                 <span className="text-[9px] font-black uppercase text-slate-500">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Campaign Analytics */}
        <div className="col-span-12 lg:col-span-7 glass-panel electric-border p-10 rounded-[3rem] space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Active Campaign Performance</h3>
          <div className="space-y-6">
            {campaigns.map((camp, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                   <Icons.Megaphone size={64} />
                </div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-white heading-font">{camp.name}</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Budget: ${camp.budget.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-pink-400 mono-font">{camp.roi}</div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">ROI</div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                   <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-slate-600 uppercase">Reach</span>
                     <span className="text-xs font-black text-white mono-font">{camp.reach}</span>
                   </div>
                   <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${camp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                    {camp.status}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
