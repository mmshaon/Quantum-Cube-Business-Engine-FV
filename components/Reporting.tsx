
import React from 'react';
import { Icons } from '../constants';

const Reporting: React.FC = () => {
  const reports = [
    { title: 'Q1 Financial Summary', type: 'Finance', status: 'Ready', date: '2024-03-31' },
    { title: 'Project Velocity Analysis', type: 'Projects', status: 'Generating', date: '2024-04-05' },
    { title: 'Market Sentiment Report', type: 'Ideas', status: 'Ready', date: '2024-04-01' },
    { title: 'HR Retention Statistics', type: 'Human Resources', status: 'Draft', date: '2024-04-02' },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 overflow-hidden select-none animate-in fade-in duration-700">
      <div className="flex justify-between items-start mb-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white flex items-baseline gap-4">
            Data Flow <span className="text-xs text-emerald-500 neon-text">ANALYTICS ENGINE</span>
          </h1>
          <p className="text-sm text-slate-500">Synthesizing raw data streams into strategic artifacts...</p>
        </div>
        <button className="glass-panel electric-border px-6 py-2 rounded text-xs font-bold uppercase bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/30 transition-all">NEW ARTIFACT</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        {[
            { label: 'Total Logs', value: '4.2M', delta: '+12%', color: 'text-blue-500' },
            { label: 'Active Streams', value: '1,024', delta: 'Steady', color: 'text-cyan-500' },
            { label: 'Artifact Gen', value: '142', delta: '+2', color: 'text-pink-500' },
            { label: 'System Load', value: '22%', delta: 'Low', color: 'text-emerald-500' }
        ].map((stat, i) => (
            <div key={i} className="glass-panel electric-border p-6 rounded-xl float-item" style={{ animationDelay: `${i*0.2}s` }}>
                <div className="text-[10px] font-black text-slate-500 uppercase mb-2">{stat.label}</div>
                <div className={`text-3xl font-black ${stat.color} neon-text mb-1`}>{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-400">{stat.delta}</div>
            </div>
        ))}
      </div>

      <div className="glass-panel electric-border rounded-2xl overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800">
                  <th className="px-10 py-6">Artifact Designation</th>
                  <th className="px-10 py-6">Sector</th>
                  <th className="px-10 py-6">Timestamp</th>
                  <th className="px-10 py-6">Sync Status</th>
                  <th className="px-10 py-6 text-right">Access</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
               {reports.map((report, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-all group">
                     <td className="px-10 py-5">
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 glass-panel electric-border rounded flex items-center justify-center text-blue-500">
                              <Icons.FileText size={16} />
                           </div>
                           <span className="text-sm font-bold text-slate-200">{report.title}</span>
                        </div>
                     </td>
                     <td className="px-10 py-5 text-xs font-bold text-slate-500 uppercase">{report.type}</td>
                     <td className="px-10 py-5 text-xs text-slate-400 font-mono">{report.date}</td>
                     <td className="px-10 py-5">
                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-sm
                           ${report.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-pink-500/10 text-pink-400 animate-pulse'}`}>
                           {report.status}
                        </span>
                     </td>
                     <td className="px-10 py-5 text-right">
                        <button className="text-[10px] font-black text-blue-400 hover:text-white uppercase tracking-widest group-hover:neon-text transition-all">Download</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default Reporting;
