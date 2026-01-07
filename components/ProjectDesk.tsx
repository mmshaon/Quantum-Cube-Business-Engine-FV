
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';
import { Task } from '../types';
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis } from 'recharts';
import { useSecurity } from './SecurityContext';

const METRICS_CONFIG = [
  { label: 'Velocity', color: '#3b82f6' },
  { label: 'Quality', color: '#d946ef' },
  { label: 'Sync', color: '#06b6d4' },
  { label: 'Stability', color: '#a3e635' },
  { label: 'Load', color: '#ef4444' },
  { label: 'Growth', color: '#10b981' },
  { label: 'Safety', color: '#f59e0b' }
];

const SegmentedProgress: React.FC<{ progress: number, color: string }> = ({ progress, color }) => {
  const segments = Array.from({ length: 10 });
  return (
    <div className="flex gap-1 items-center">
      {segments.map((_, i) => {
        const isActive = (i + 1) * 10 <= progress;
        return (
          <div 
            key={i} 
            className={`h-1.5 w-4 rounded-full transition-all duration-500
              ${isActive ? 'opacity-100' : 'opacity-10 bg-slate-800'}`}
            style={{ backgroundColor: isActive ? color : undefined, boxShadow: isActive ? `0 0 8px ${color}50` : 'none' }}
          />
        );
      })}
      <span className="text-[10px] font-black mono-font ml-2 opacity-60" style={{ color: progress === 100 ? '#10b981' : 'inherit' }}>
        {progress}%
      </span>
    </div>
  );
};

const ProjectDesk: React.FC = () => {
  const { submitForm } = useSecurity();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', projectId: 'p1', title: 'Setup quantum server architecture', completed: true, progress: 100, priority: 'high', dueDate: '2024-04-01' },
    { id: '2', projectId: 'p1', title: 'Implement end-to-end encryption', completed: false, progress: 45, priority: 'high', dueDate: '2024-04-10' },
    { id: '3', projectId: 'p1', title: 'Frontend UI Polish', completed: false, progress: 70, priority: 'medium', dueDate: '2024-04-15' },
    { id: '4', projectId: 'p1', title: 'Neural Core Integration', completed: false, progress: 15, priority: 'high', dueDate: '2024-04-20' },
    { id: '5', projectId: 'p1', title: 'Yusra AI Prompt Sync', completed: false, progress: 30, priority: 'medium', dueDate: '2024-04-25' },
  ]);

  const [confirmTask, setConfirmTask] = useState<Task | null>(null);
  const [reportText, setReportText] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [eqData, setEqData] = useState(METRICS_CONFIG.map(m => ({ name: m.label, val: 40 + Math.random() * 40 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setEqData(prev => prev.map(item => ({
        ...item,
        val: Math.max(15, Math.min(100, item.val + (Math.random() * 30 - 15)))
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleTaskAction = (task: Task) => {
    if (task.completed) {
      // Re-opening a task is direct
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: false, progress: 50 } : t));
    } else {
      // Completing a task requires confirmation and report
      setConfirmTask(task);
      setReportText('');
    }
  };

  const finalizeCompletion = async () => {
    if (!confirmTask || !reportText.trim()) return;

    setIsSubmittingReport(true);
    try {
      // Mandatory report submission
      await submitForm('task_report', [{
        title: `Completion Report: ${confirmTask.title}`,
        description: reportText,
        taskId: confirmTask.id
      }], null);

      // Update local task state
      setTasks(tasks.map(t => t.id === confirmTask.id ? { ...t, completed: true, progress: 100 } : t));
      setConfirmTask(null);
    } catch (err) {
      console.error("Failed to finalize task:", err);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const incompleteCount = totalTasks - completedCount;

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 overflow-hidden select-none animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white heading-font flex items-center gap-4">
            Project Pulse <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-1.5 rounded tracking-[0.3em] uppercase mono-font animate-pulse">Neural Synchronization</span>
          </h1>
          <p className="text-sm text-slate-500 italic">"Visualizing high-fidelity project throughput via multi-spectral neural bands."</p>
        </div>
        
        <div className="flex gap-4">
            <div className="glass-panel electric-border p-5 rounded-2xl text-center min-w-[140px] flex flex-col justify-center">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Health</div>
                <div className="text-2xl font-black text-emerald-400 mono-font">OPTIMAL</div>
            </div>
            <div className="glass-panel electric-border p-5 rounded-2xl text-center min-w-[140px] flex flex-col justify-center">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Sync Ratio</div>
                <div className="text-2xl font-black text-blue-400 mono-font">{totalTasks > 0 ? Math.round((completedCount/totalTasks)*100) : 0}%</div>
            </div>
        </div>
      </header>

      {/* Task Summary Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-1000">
        <div className="glass-panel border-l-4 border-blue-500 p-6 rounded-3xl flex items-center justify-between group hover:bg-blue-500/5 transition-all">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Payload</span>
            <span className="text-3xl font-black text-white mono-font tracking-tighter">{totalTasks}</span>
          </div>
          <Icons.Database className="text-blue-500/30 group-hover:text-blue-500 group-hover:scale-110 transition-all" size={32} />
        </div>
        
        <div className="glass-panel border-l-4 border-emerald-500 p-6 rounded-3xl flex items-center justify-between group hover:bg-emerald-500/5 transition-all">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Sync Finalized</span>
            <span className="text-3xl font-black text-emerald-400 mono-font tracking-tighter">{completedCount}</span>
          </div>
          <Icons.CheckCircle2 className="text-emerald-500/30 group-hover:text-emerald-500 group-hover:scale-110 transition-all" size={32} />
        </div>

        <div className="glass-panel border-l-4 border-pink-500 p-6 rounded-3xl flex items-center justify-between group hover:bg-pink-500/5 transition-all">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Pending Uplink</span>
            <span className="text-3xl font-black text-pink-400 mono-font tracking-tighter">{incompleteCount}</span>
          </div>
          <Icons.Clock className="text-pink-500/30 group-hover:text-pink-500 group-hover:scale-110 transition-all" size={32} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[calc(100vh-420px)]">
        <div className="col-span-12 lg:col-span-5 h-full flex flex-col">
           <div className="glass-panel electric-border p-8 rounded-3xl flex-1 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Project Equalizer</h3>
                 <Icons.BrainCircuit size={18} className="text-blue-500 animate-pulse" />
              </div>

              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eqData}>
                       <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                          {eqData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={METRICS_CONFIG[index].color} fillOpacity={0.8} />
                          ))}
                       </Bar>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 900}} />
                       <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} content={() => null} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                 {METRICS_CONFIG.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5 transition-all hover:bg-white/10">
                       <div className="w-2 h-2 rounded-full shadow-lg" style={{ backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}` }} />
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                       <span className="text-[10px] font-black text-white ml-auto mono-font">{Math.round(eqData[i].val)}%</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-7 overflow-y-auto custom-scrollbar space-y-4 pr-4 pb-12">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">Task Sync Stream</h4>
            {tasks.map((task, idx) => (
                <div 
                    key={task.id} 
                    className={`glass-panel electric-border p-6 rounded-3xl flex flex-col gap-6 cursor-pointer transition-all duration-500 hover:bg-white/5 group
                        ${task.completed ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
                >
                    <div className="flex items-center gap-6" onClick={() => handleTaskAction(task)}>
                      <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shrink-0
                          ${task.completed ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-800'}`}>
                          {task.completed && <Icons.CheckSquare size={24} className="text-slate-900" />}
                      </div>
                      <div className="flex-1">
                          <div className="text-lg font-black text-slate-100 mb-1 heading-font tracking-tight group-hover:text-blue-400 transition-colors">
                            {task.title}
                          </div>
                          <div className="flex items-center gap-4">
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border 
                                ${task.priority === 'high' ? 'bg-pink-600/10 text-pink-500 border-pink-500/20' : 
                                  task.priority === 'medium' ? 'bg-amber-600/10 text-amber-500 border-amber-500/20' : 
                                  'bg-blue-600/10 text-blue-500 border-blue-500/20'}`}>
                                  {task.priority} Priority
                              </span>
                              <span className="text-[8px] text-slate-600 mono-font">NODE_ID: {idx + 1024}</span>
                          </div>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                          <Icons.ChevronRight size={18} />
                      </div>
                    </div>

                    <div className="px-2 pb-1">
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Neural Sync Progress</div>
                      <SegmentedProgress 
                        progress={task.progress} 
                        color={task.completed ? '#10b981' : task.priority === 'high' ? '#ef4444' : '#3b82f6'} 
                      />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      {confirmTask && (
        <div className="fixed inset-0 z-[100] bg-void/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="w-full max-w-xl glass-panel electric-border rounded-[3rem] p-10 lg:p-14 relative overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Icons.CheckSquare size={120} className="text-emerald-500" />
              </div>

              <div className="relative z-10 text-center mb-10">
                 <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <Icons.CheckSquare size={40} className="text-emerald-400" />
                 </div>
                 <h2 className="text-3xl font-black text-white heading-font uppercase tracking-tighter mb-2">Protocol Finalization</h2>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                   Confirm completion for: <span className="text-blue-400">{confirmTask.title}</span>
                 </p>
              </div>

              <div className="space-y-6 relative z-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Neural Completion Report (Mandatory)</label>
                    <textarea 
                       placeholder="Synthesize operational findings and milestones achieved..."
                       value={reportText}
                       onChange={(e) => setReportText(e.target.value)}
                       className="w-full h-40 bg-void/60 border border-white/5 rounded-3xl p-6 text-sm text-slate-200 placeholder:text-slate-700 focus:border-emerald-500/50 outline-none transition-all resize-none font-medium leading-relaxed"
                    />
                 </div>

                 <div className="flex gap-4">
                    <button 
                       onClick={() => setConfirmTask(null)}
                       className="flex-1 py-5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all"
                    >
                       Abort Sync
                    </button>
                    <button 
                       onClick={finalizeCompletion}
                       disabled={!reportText.trim() || isSubmittingReport}
                       className={`flex-1 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] text-white transition-all shadow-xl
                         ${reportText.trim() && !isSubmittingReport ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-slate-800 opacity-50 cursor-not-allowed'}`}
                    >
                       {isSubmittingReport ? 'Uplinking...' : 'Establish Completion'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDesk;
