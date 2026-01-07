
import React, { useState } from 'react';
import { useSecurity } from './SecurityContext';
import { Icons } from '../constants';
import { Role, Policy, DelegationRule } from '../types';

type Tab = 'roles' | 'policies' | 'delegations' | 'audit';

const SecurityManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('roles');
  const { roles, policies, delegations, currentCube } = useSecurity();

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'roles', label: 'Roles & RBAC', icon: Icons.Briefcase },
    { id: 'policies', label: 'ABAC Policies', icon: Icons.ShieldCheck },
    { id: 'delegations', label: 'Yusra Delegations', icon: Icons.BrainCircuit },
    { id: 'audit', label: 'Audit Streams', icon: Icons.FileText },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500 uppercase leading-none">
            Security Kernel
          </h1>
          <p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase mono-font">Core Governance & Permission Matrix</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col items-end border-red-500/20">
              <span className="text-[8px] font-black text-slate-500 uppercase">Current Cube</span>
              <span className="text-sm font-black text-red-400 mono-font">{currentCube?.name || 'NULL'}</span>
           </div>
        </div>
      </header>

      <nav className="flex gap-12 mb-12 border-b border-white/5 relative z-10 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative flex items-center gap-3
              ${activeTab === tab.id ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-500 shadow-[0_0_15px_#ef4444]" />
            )}
          </button>
        ))}
      </nav>

      <div className="animate-in slide-in-from-bottom-6 duration-700">
        {activeTab === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map(role => (
              <div key={role.id} className="glass-panel electric-border p-8 rounded-[2.5rem] flex flex-col hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/30">
                    <Icons.Briefcase size={24} />
                  </div>
                  <span className="text-[8px] font-black uppercase text-slate-500 mono-font">{role.id}</span>
                </div>
                <h3 className="text-xl font-black heading-font text-white mb-2">{role.name}</h3>
                <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium">{role.description}</p>
                
                <div className="space-y-4">
                  <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.allowed_actions.map(action => (
                      <span key={action} className="text-[8px] font-black uppercase px-3 py-1 bg-white/5 rounded border border-white/5 text-slate-400">{action}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button className="glass-panel border-dashed border-2 border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 hover:text-red-500 hover:border-red-500/30 transition-all group min-h-[300px]">
              <Icons.Plus size={40} className="mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em]">Create Role</span>
            </button>
          </div>
        )}

        {activeTab === 'delegations' && (
          <div className="space-y-8">
             <div className="glass-panel electric-border p-10 rounded-[3rem] bg-indigo-600/5">
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                      <Icons.BrainCircuit size={32} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black heading-font text-white uppercase tracking-tighter">Yusra Global Delegation</h3>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Autonomous Agent Authorization Rules</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {delegations.map(rule => (
                      <div key={rule.id} className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-void/40">
                         <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                               <span className="text-[10px] font-black text-emerald-400 uppercase mono-font">Active Protocol</span>
                            </div>
                            <span className="text-[9px] font-black text-slate-600 uppercase mono-font">{rule.id}</span>
                         </div>
                         <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="space-y-1">
                               <span className="text-[8px] font-black text-slate-500 uppercase">Delegated From</span>
                               <p className="text-xs font-bold text-white uppercase tracking-widest">User_123 (John CEO)</p>
                            </div>
                            <div className="space-y-1">
                               <span className="text-[8px] font-black text-slate-500 uppercase">Valid Until</span>
                               <p className="text-xs font-bold text-slate-300 mono-font">{rule.valid_until.split('T')[0]}</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <span className="text-[8px] font-black text-slate-500 uppercase">Authorized Scope</span>
                            <div className="flex flex-wrap gap-2">
                               {rule.scope.map(s => (
                                  <span key={s} className="text-[9px] font-black uppercase px-3 py-1.5 bg-indigo-500/10 text-indigo-300 rounded-xl border border-indigo-500/20">{s}</span>
                               ))}
                            </div>
                         </div>
                         <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                            <div className="space-y-1">
                               <span className="text-[8px] font-black text-slate-500 uppercase">Max Authorization</span>
                               <p className="text-sm font-black text-white mono-font">${rule.constraints.max_amount?.toLocaleString() || 'Unlimited'}</p>
                            </div>
                            <button className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-400 transition-colors">Revoke Rule</button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'audit' && (
           <div className="glass-panel electric-border rounded-[3rem] overflow-hidden bg-void/20">
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th className="px-10 py-6">Identity (Actor)</th>
                    <th className="px-10 py-6">Proxy (For User)</th>
                    <th className="px-10 py-6">Action Performed</th>
                    <th className="px-10 py-6">Decision Artifact</th>
                    <th className="px-10 py-6 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[11px] font-medium">
                  {[
                    { actor: 'Yusra_AI', for: 'John CEO', action: 'invoice.approve', reason: 'Within $50k delegation limit.', ts: '10:42:01' },
                    { actor: 'John CEO', for: 'N/A', action: 'security.role_update', reason: 'Cube owner override.', ts: '09:15:32' },
                    { actor: 'Yusra_AI', for: 'John CEO', action: 'project.edit', reason: 'Strategic re-routing protocol.', ts: '08:52:11' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-all group">
                      <td className="px-10 py-6">
                         <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${log.actor.includes('Yusra') ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'}`} />
                            <span className="font-black text-white uppercase tracking-widest">{log.actor}</span>
                         </div>
                      </td>
                      <td className="px-10 py-6 text-slate-500 font-bold uppercase">{log.for}</td>
                      <td className="px-10 py-6">
                         <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-slate-300 font-black mono-font">{log.action}</span>
                      </td>
                      <td className="px-10 py-6 text-slate-600 font-medium italic">"{log.reason}"</td>
                      <td className="px-10 py-6 text-right mono-font text-slate-500">{log.ts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        )}
      </div>
    </div>
  );
};

export default SecurityManagement;
