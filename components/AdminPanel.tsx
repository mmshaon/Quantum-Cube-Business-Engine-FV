
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';
import { useSecurity } from './SecurityContext';

type AdminTab = 'submissions' | 'users' | 'yusra' | 'security' | 'reports' | 'system';

const AdminPanel: React.FC = () => {
  const { 
    dbStatus, getPendingUsers, adminApproveUser, getAllSubmissions, 
    reviewSubmission, getAllUsers, updateYusraTraining, getYusraInstruction,
    systemBackup, systemRestore, resetAdminSystem, currentUser
  } = useSecurity();

  const [activeTab, setActiveTab] = useState<AdminTab>('submissions');
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [yusraText, setYusraText] = useState('');

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const [pend, all, subs, yusra] = await Promise.all([
        getPendingUsers(), getAllUsers(), getAllSubmissions(), getYusraInstruction()
      ]);
      setPendingUsers(pend);
      setAllUsers(all);
      setSubmissions(subs);
      setYusraText(yusra);
    } finally { setIsRefreshing(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleReview = async (id: number, status: 'approved' | 'rejected') => {
    await reviewSubmission(id, status, feedback[id] || "Reviewed by Kernel Admin.");
    loadData();
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "quantum_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const navItems = [
    { id: 'submissions', label: 'Review Queue', icon: Icons.Send },
    { id: 'users', label: 'Identity Matrix', icon: Icons.Users },
    { id: 'yusra', label: 'AI Training', icon: Icons.BrainCircuit },
    { id: 'security', label: 'Neural Shield', icon: Icons.ShieldCheck },
    { id: 'reports', label: 'Intelligence', icon: Icons.FileText },
    { id: 'system', label: 'Maintenance', icon: Icons.Settings },
  ];

  return (
    <div className="relative min-h-screen bg-[#02001a] flex font-mono text-emerald-500 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-emerald-900/30 flex flex-col relative z-20">
         <div className="p-8 border-b border-emerald-900/30">
            <h1 className="text-xl font-black tracking-tighter uppercase italic text-white">System Kernel</h1>
            <p className="text-[8px] opacity-40 mt-1 uppercase tracking-widest">Global Command Terminal</p>
            {currentUser?.isOwner && (
               <div className="mt-4 px-2 py-1 bg-pink-600/20 border border-pink-500/50 rounded flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-[8px] font-black text-pink-400 uppercase tracking-widest">SERVICE MODE: ACTIVE</span>
               </div>
            )}
         </div>
         <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest
                  ${activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
         </nav>
         <div className="p-8 border-t border-emerald-900/30 text-[8px] opacity-40 uppercase">
            v2.9.4 // {dbStatus}
         </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 overflow-y-auto p-12 relative z-10 custom-scrollbar">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:30px:30px]" />
        
        <header className="flex justify-between items-end mb-16 border-b border-emerald-900/20 pb-8">
           <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase text-white">{activeTab.replace('_', ' ')}</h2>
              <p className="text-[10px] opacity-40 mt-2 uppercase tracking-[0.4em]">Protocol: Security Level Alpha</p>
           </div>
           <button onClick={loadData} className="px-6 py-3 border border-emerald-900 bg-emerald-900/10 rounded-xl text-[10px] font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all">
             {isRefreshing ? 'Scanning...' : 'Refresh Matrix'}
           </button>
        </header>

        {/* Tab content */}
        {activeTab === 'submissions' && (
           <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {submissions.length === 0 ? (
                <div className="p-20 border border-emerald-900/30 rounded-[3rem] text-center text-[10px] font-black uppercase opacity-30">Zero Operational Data in Buffer</div>
              ) : (
                submissions.map(sub => (
                  <div key={sub.id} className={`glass-panel p-8 rounded-[2.5rem] border border-emerald-900/20 ${sub.status === 'pending' ? 'bg-emerald-500/5' : 'opacity-60 grayscale'}`}>
                     <div className="flex justify-between items-center mb-8">
                        <div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{sub.type.replace('_', ' ')}</span>
                           <h4 className="text-xl font-black text-white uppercase mt-1">{sub.user_name}</h4>
                        </div>
                        <div className="text-right">
                           <div className="text-[8px] opacity-40 uppercase mono-font">Uplinked: {sub.created_at}</div>
                           <div className={`text-[9px] font-black uppercase mt-1 px-3 py-1 rounded-full inline-block
                             ${sub.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 
                               sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 
                               'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                             {sub.status}
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <span className="text-[8px] font-black uppercase opacity-40">Data Payload</span>
                           <div className="space-y-2">
                              {JSON.parse(sub.content).map((it: any, i: number) => (
                                <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                                   <div className="flex justify-between text-[10px] font-black uppercase text-white mb-1">
                                      <span>{it.title}</span>
                                      {it.amount && <span className="text-pink-400">${it.amount}</span>}
                                   </div>
                                   <p className="text-[10px] opacity-50">{it.description}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                        {sub.media_data && (
                           <div className="space-y-4">
                              <span className="text-[8px] font-black uppercase opacity-40">Evidence Capture</span>
                              <img src={sub.media_data} className="w-full h-48 object-cover rounded-[2rem] border border-emerald-900/30" />
                           </div>
                        )}
                     </div>

                     {sub.status === 'pending' && (
                        <div className="mt-8 pt-8 border-t border-emerald-900/20 space-y-4">
                           <textarea 
                             placeholder="Provide Strategic Feedback..."
                             value={feedback[sub.id] || ''}
                             onChange={(e) => setFeedback({...feedback, [sub.id]: e.target.value})}
                             className="w-full bg-black/60 border border-emerald-900/30 p-4 rounded-2xl text-[10px] text-emerald-400 focus:outline-none placeholder:opacity-20"
                           />
                           <div className="flex gap-4">
                              <button onClick={() => handleReview(sub.id, 'approved')} className="flex-1 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-105 transition-all">Approve Protocol</button>
                              <button onClick={() => handleReview(sub.id, 'rejected')} className="flex-1 py-4 border border-red-900 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-red-500/10 transition-all">Deny Uplink</button>
                           </div>
                        </div>
                     )}
                  </div>
                ))
              )}
           </div>
        )}

        {activeTab === 'users' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
              {allUsers.map(user => (
                <div key={user.id} className="glass-panel p-8 rounded-[2.5rem] border border-emerald-900/20 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center font-black text-xl text-white">
                        {user.name[0]}
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded
                        ${user.is_approved ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500 animate-pulse'}`}>
                        {user.is_approved ? 'Verified' : 'Pending'}
                      </span>
                   </div>
                   <div className="mt-6">
                      <h4 className="text-xl font-black text-white uppercase">{user.name}</h4>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest">{user.email}</p>
                   </div>
                   <div className="mt-8 flex gap-3">
                      <button onClick={() => adminApproveUser(user.id, 'analyst')} className="flex-1 py-2 border border-emerald-900/50 text-[8px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all">Analyst</button>
                      <button onClick={() => adminApproveUser(user.id, 'manager')} className="flex-1 py-2 border border-emerald-900/50 text-[8px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all">Manager</button>
                      <button onClick={() => adminApproveUser(user.id, 'ceo')} className="flex-1 py-2 border border-emerald-900/50 text-[8px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all">CEO</button>
                   </div>
                </div>
              ))}
           </div>
        )}

        {activeTab === 'yusra' && (
           <div className="glass-panel p-12 rounded-[3rem] border border-emerald-900/20 animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-6 mb-12">
                 <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/30 animate-pulse">
                    <Icons.BrainCircuit size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase">Neural Training Interface</h3>
                    <p className="text-[9px] opacity-40 uppercase tracking-[0.4em]">Operational Personality Sync</p>
                 </div>
              </div>
              <textarea 
                value={yusraText}
                onChange={(e) => setYusraText(e.target.value)}
                className="w-full h-64 bg-black/60 border border-blue-900/30 p-8 rounded-3xl text-xs leading-relaxed text-blue-300 focus:outline-none focus:border-blue-500/50 transition-all font-mono"
              />
              <button 
                onClick={() => updateYusraTraining(yusraText)}
                className="mt-8 w-full py-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-3xl hover:bg-blue-500 hover:scale-[1.01] transition-all"
              >
                Inject Neural Instructions
              </button>
           </div>
        )}

        {activeTab === 'reports' && (
           <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: 'Fiscal Velocity', val: '$240k', icon: Icons.DollarSign },
                   { label: 'Node Productivity', val: '94%', icon: Icons.CheckSquare },
                   { label: 'Neural Health', val: 'Optimal', icon: Icons.BrainCircuit }
                 ].map((stat, i) => (
                    <div key={i} className="glass-panel p-10 rounded-[2.5rem] text-center space-y-4">
                       <stat.icon size={24} className="mx-auto opacity-40" />
                       <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                       <div className="text-3xl font-black text-white mono-font">{stat.val}</div>
                    </div>
                 ))}
              </div>
              <div className="glass-panel p-12 rounded-[3rem] border border-emerald-900/20 text-center">
                 <Icons.FileText size={48} className="mx-auto mb-8 opacity-20" />
                 <h4 className="text-xl font-black text-white uppercase mb-4">Export Operational Matrix</h4>
                 <p className="text-[10px] opacity-40 mb-12 max-w-sm mx-auto uppercase leading-relaxed">Generate encrypted data artifacts for physical archival or external intelligence processing.</p>
                 <div className="flex gap-4 max-w-md mx-auto">
                    <button onClick={exportData} className="flex-1 py-5 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all">Export JSON</button>
                    <button onClick={() => window.print()} className="flex-1 py-5 border border-emerald-900 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500/10 transition-all">Print PDF</button>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'system' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
              <div className="glass-panel p-10 rounded-[3rem] border border-emerald-900/20 text-center space-y-8">
                 <Icons.Database size={48} className="mx-auto opacity-20" />
                 <div>
                    <h4 className="text-lg font-black text-white uppercase">Cold Storage Backup</h4>
                    <p className="text-[9px] opacity-40 uppercase tracking-widest mt-2">Create encrypted restore point</p>
                 </div>
                 <button onClick={systemBackup} className="w-full py-4 border border-emerald-900 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500/10 transition-all">Initialize Backup</button>
              </div>
              <div className="glass-panel p-10 rounded-[3rem] border border-emerald-900/20 text-center space-y-8">
                 <Icons.Activity size={48} className="mx-auto opacity-20" />
                 <div>
                    <h4 className="text-lg font-black text-white uppercase">Restore Protocol</h4>
                    <p className="text-[9px] opacity-40 uppercase tracking-widest mt-2">Revert system to previous node</p>
                 </div>
                 <button onClick={systemRestore} className="w-full py-4 border border-red-900 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-500/10 transition-all">Trigger Restore</button>
              </div>

              {currentUser?.isOwner && (
                <div className="col-span-full mt-10 p-12 glass-panel border border-pink-500/30 bg-pink-500/5 rounded-[3.5rem] text-center">
                   <Icons.ShieldAlert size={48} className="mx-auto mb-6 text-pink-500 animate-pulse" />
                   <h3 className="text-2xl font-black text-white uppercase mb-2">Service Mode Emergency Hub</h3>
                   <p className="text-[10px] text-pink-400 font-bold uppercase tracking-[0.4em] mb-12">Authorized Personnel: {currentUser.email}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <button 
                        onClick={resetAdminSystem}
                        className="py-6 bg-pink-600 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-pink-500 hover:scale-105 transition-all shadow-xl shadow-pink-500/20"
                      >
                         Force Admin Recovery
                      </button>
                      <button 
                        onClick={() => alert("System Optimization Protocol Initiated")}
                        className="py-6 border border-pink-500 text-pink-400 text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-pink-500/10 transition-all"
                      >
                         Deep Neural Wipe
                      </button>
                   </div>
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
