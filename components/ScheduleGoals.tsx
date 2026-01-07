
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';
import { Goal } from '../types';

interface CalendarTask {
  day: number;
  priority: 'high' | 'medium' | 'low';
  label: string;
}

const ScheduleGoals: React.FC = () => {
  const [goals] = useState<Goal[]>([
    { id: 'g1', title: 'Market Share Expansion', category: 'Growth', progress: 65, status: 'on-track', dueDate: '2024-12-31' },
    { id: 'g2', title: 'Series B Funding Round', category: 'Finance', progress: 40, status: 'at-risk', dueDate: '2024-09-15' },
    { id: 'g3', title: 'Carbon Neutrality Initiative', category: 'ESG', progress: 12, status: 'delayed', dueDate: '2025-06-01' },
  ]);

  const [tasks] = useState<CalendarTask[]>([
    { day: 5, priority: 'high', label: 'R&D Sync' },
    { day: 12, priority: 'medium', label: 'Fiscal Review' },
    { day: 15, priority: 'high', label: 'Board Meet' },
    { day: 22, priority: 'low', label: 'Node Maint' },
    { day: 28, priority: 'medium', label: 'QA Sprint' },
  ]);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 overflow-hidden select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-16 relative z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white heading-font flex items-baseline gap-4 uppercase">
            Temporal Matrix <span className="text-[10px] text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-sm tracking-[0.3em] uppercase mono-font animate-pulse">Quantum Forecast</span>
          </h1>
          <p className="text-sm text-slate-500 italic">"Navigating high-dimensional scheduling nodes across the enterprise timeline."</p>
        </div>
        <button className="glass-panel electric-border px-8 py-4 rounded-2xl text-[10px] font-black uppercase bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/30 transition-all shadow-[0_0_30px_rgba(234,179,8,0.1)]">SYNC NEW OBJECTIVE</button>
      </header>

      <div className="grid grid-cols-12 gap-10 h-[calc(100vh-250px)] relative z-10">
        
        {/* Tactical Quantum Calendar */}
        <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
           <div className="glass-panel electric-border p-10 rounded-[3rem] flex-1 flex flex-col bg-void/40 backdrop-blur-3xl water-ripple">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                    <Icons.CalendarDays className="text-blue-400" size={20} />
                    <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Tactical Synchronization Loop</h3>
                 </div>
                 <div className="flex gap-6">
                    {[
                      { l: 'Critical', c: 'bg-pink-500 shadow-pink-500' },
                      { l: 'Strategic', c: 'bg-amber-500 shadow-amber-500' },
                      { l: 'Standard', c: 'bg-blue-500 shadow-blue-500' }
                    ].map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${p.c} shadow-[0_0_10px_currentColor]`} />
                         <span className="text-[8px] font-black uppercase text-slate-500">{p.l}</span>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="grid grid-cols-7 gap-4 flex-1">
                 {/* Weekday headers */}
                 {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                   <div key={day} className="text-center text-[9px] font-black text-slate-600 tracking-widest mb-2">{day}</div>
                 ))}
                 
                 {Array.from({length: 31}).map((_, i) => {
                    const day = i + 1;
                    const task = tasks.find(t => t.day === day);
                    const isActive = (day + Math.floor(tick/2)) % 7 === 0;
                    
                    return (
                      <div key={i} className={`glass-panel border border-white/5 rounded-2xl flex flex-col items-center justify-between p-4 transition-all duration-700 group hover:bg-white/10 cursor-pointer h-24 relative overflow-hidden
                        ${isActive ? 'border-blue-500/30 bg-blue-500/5' : ''}`}>
                         
                         {/* Cell Header */}
                         <div className="w-full flex justify-between items-start">
                           <span className={`text-[10px] font-black mono-font ${isActive ? 'text-blue-400' : 'text-slate-700'}`}>{day}</span>
                           {task && (
                             <div className={`w-1.5 h-1.5 rounded-full animate-ping
                               ${task.priority === 'high' ? 'bg-pink-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} 
                             />
                           )}
                         </div>

                         {/* Task visualization */}
                         {task ? (
                           <div className="flex flex-col items-center gap-2">
                             <div className={`w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] animate-bounce
                               ${task.priority === 'high' ? 'text-pink-500 bg-pink-500' : task.priority === 'medium' ? 'text-amber-500 bg-amber-500' : 'text-blue-500 bg-blue-500'}`} />
                             <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 line-clamp-1">{task.label}</span>
                           </div>
                         ) : (
                           <div className="w-1 h-1 bg-white/5 rounded-full" />
                         )}

                         {/* Background particle */}
                         <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/5 rounded-full blur-lg group-hover:bg-blue-500/10 transition-colors" />
                      </div>
                    );
                 })}
              </div>
           </div>
        </div>

        {/* Goals List (Multi-Color Indicators) */}
        <div className="col-span-12 lg:col-span-4 space-y-6 overflow-y-auto custom-scrollbar pr-4">
           <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">Strategic Constellation</h4>
           {goals.map((goal, idx) => (
               <div key={goal.id} className="glass-panel electric-border p-8 rounded-[2.5rem] relative float-item overflow-hidden transition-all hover:translate-x-2 bg-void/20 backdrop-blur-xl">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                     <Icons.Flag size={64} className={idx === 0 ? 'text-blue-500' : idx === 1 ? 'text-pink-500' : 'text-amber-500'} />
                  </div>
                  <div className="flex justify-between items-start mb-8">
                     <div>
                        <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${idx === 0 ? 'text-blue-400' : idx === 1 ? 'text-pink-400' : 'text-amber-400'}`}>{goal.category}</span>
                        <h3 className="text-xl font-black text-white mt-1 heading-font tracking-tight">{goal.title}</h3>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Synergy Index</span>
                        <span className="text-white mono-font">{goal.progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
                        <div className={`h-full rounded-full transition-all duration-1000 shadow-lg ${idx === 0 ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : idx === 1 ? 'bg-gradient-to-r from-pink-600 to-rose-400' : 'bg-gradient-to-r from-amber-600 to-orange-400'}`} 
                             style={{ width: `${goal.progress}%` }} />
                     </div>
                  </div>
               </div>
           ))}
           
           <div className="p-10 glass-panel electric-border rounded-[2.5rem] text-center space-y-6 bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/10">
              <Icons.Target className="mx-auto text-blue-400 animate-pulse" size={48} />
              <div className="space-y-1">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Temporal Alignment</div>
                 <div className="text-6xl font-black text-white mono-font tracking-tighter italic">84.2<span className="text-blue-500">%</span></div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-500" style={{ width: '84.2%' }} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGoals;
