
import React, { useState } from 'react';
import { Icons } from '../constants';
import { AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar, Cell } from 'recharts';

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ledger' | 'invoices' | 'budget'>('ledger');
  const [data] = useState(Array.from({ length: 20 }, (_, i) => ({
    name: i,
    val: 4000 + Math.random() * 2000,
    expenses: 3000 + Math.random() * 1500,
  })));

  const invoices = [
    { id: 'INV-1024', customer: 'Nexus Corp', amount: 12500, status: 'Paid', date: '2024-03-20' },
    { id: 'INV-1025', customer: 'Aether Sol', amount: 8400, status: 'Overdue', date: '2024-03-15' },
    { id: 'INV-1026', customer: 'Hyperion', amount: 21000, status: 'Sent', date: '2024-03-25' },
    { id: 'INV-1027', customer: 'Cyberdyne', amount: 5500, status: 'Paid', date: '2024-03-10' },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 uppercase">
            Fiscal Core Engine
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Double-Entry Quantum Ledger</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-500 uppercase">Cash Reserve</span>
            <span className="text-xl font-black text-emerald-400 mono-font">$2,452,100.80</span>
          </div>
        </div>
      </header>

      <nav className="flex gap-10 mb-12 border-b border-white/5 relative z-10 overflow-x-auto no-scrollbar">
        {['ledger', 'invoices', 'budget'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative
              ${activeTab === tab ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
            )}
          </button>
        ))}
      </nav>

      {activeTab === 'ledger' && (
        <div className="grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="col-span-12 lg:col-span-8 glass-panel electric-border p-8 rounded-[2.5rem] min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Equity Oscillation</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> <span className="text-[8px] font-black uppercase text-slate-500">Revenue</span></div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500" /> <span className="text-[8px] font-black uppercase text-slate-500">OPEX</span></div>
               </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="#3b82f620" strokeWidth={3} />
                  <Area type="monotone" dataKey="expenses" stroke="#d946ef" fill="#d946ef20" strokeWidth={3} />
                  <Tooltip contentStyle={{ background: '#02001a', border: '1px solid #ffffff10' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
             <div className="glass-panel electric-border p-8 rounded-[2rem] flex flex-col items-center justify-center text-center">
                <Icons.AlertTriangle className="text-amber-500 mb-4" size={32} />
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tax Provisioning</h4>
                <div className="text-3xl font-black text-white mono-font my-2">$42,150</div>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Next Due: April 15</p>
             </div>
             <div className="glass-panel electric-border p-8 rounded-[2rem] flex flex-col items-center justify-center text-center bg-blue-600/5">
                <Icons.Target className="text-blue-500 mb-4" size={32} />
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Profit Variance</h4>
                <div className="text-3xl font-black text-emerald-400 mono-font my-2">+12.4%</div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                   <div className="h-full bg-emerald-500" style={{ width: '82%' }} />
                </div>
             </div>
          </div>

          <div className="col-span-12 glass-panel electric-border rounded-[2.5rem] overflow-hidden mt-4">
             <table className="w-full text-left">
                <thead className="bg-white/5">
                   <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <th className="px-10 py-6">Transaction ID</th>
                      <th className="px-10 py-6">Account</th>
                      <th className="px-10 py-6">Type</th>
                      <th className="px-10 py-6">Debit</th>
                      <th className="px-10 py-6">Credit</th>
                      <th className="px-10 py-6 text-right">Balance</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {[
                     { id: 'TX-42001', acc: 'Accounts Receivable', type: 'Asset', d: '12,500.00', c: '0.00', b: '254,100' },
                     { id: 'TX-42002', acc: 'Office Rent', type: 'Expense', d: '0.00', c: '4,500.00', b: '249,600' },
                     { id: 'TX-42003', acc: 'Stripe Payout', type: 'Revenue', d: '22,100.00', c: '0.00', b: '271,700' },
                   ].map((tx, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-all text-sm font-medium">
                         <td className="px-10 py-5 mono-font text-slate-400">{tx.id}</td>
                         <td className="px-10 py-5 text-white">{tx.acc}</td>
                         <td className="px-10 py-5 text-[10px] uppercase font-black text-slate-500">{tx.type}</td>
                         <td className="px-10 py-5 text-emerald-400 mono-font">{tx.d}</td>
                         <td className="px-10 py-5 text-pink-400 mono-font">{tx.c}</td>
                         <td className="px-10 py-5 text-right font-black mono-font">${tx.b}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
           {invoices.map((inv, i) => (
              <div key={i} className="glass-panel electric-border p-8 rounded-[2rem] hover:scale-105 transition-all cursor-pointer group">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <Icons.FileText size={20} />
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : inv.status === 'Overdue' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'}`}>
                       {inv.status}
                    </span>
                 </div>
                 <h4 className="text-lg font-black text-white heading-font mb-1">{inv.customer}</h4>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{inv.id} • {inv.date}</p>
                 <div className="text-2xl font-black text-white mono-font">${inv.amount.toLocaleString()}</div>
              </div>
           ))}
           <div className="glass-panel border-dashed border-2 border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center text-slate-600 hover:text-blue-500 hover:border-blue-500/30 transition-all cursor-pointer group">
              <Icons.Plus size={32} className="mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest">Generate Invoice</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
