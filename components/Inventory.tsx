
import React, { useState } from 'react';
import { Icons } from '../constants';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

const Inventory: React.FC = () => {
  const [stockData] = useState([
    { name: 'Quantum CPU', onHand: 420, reserved: 80, color: '#3b82f6' },
    { name: 'Neural Links', onHand: 850, reserved: 210, color: '#d946ef' },
    { name: 'Ledger Chips', onHand: 240, reserved: 15, color: '#06b6d4' },
    { name: 'Graphene Mesh', onHand: 1200, reserved: 450, color: '#a3e635' },
    { name: 'Liquid Coolant', onHand: 310, reserved: 45, color: '#fbbf24' },
  ]);

  const warehouses = [
    { id: 'WH-ALPHA', name: 'Main Hub (London)', occupancy: 82, status: 'Optimal' },
    { id: 'WH-BETA', name: 'APAC Node (Singapore)', occupancy: 94, status: 'Critical' },
    { id: 'WH-GAMMA', name: 'West-1 (SF)', occupancy: 45, status: 'Active' },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-emerald-500 uppercase">
            Inventory Matrix
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Automated SKU Synchronization Node</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-end border-lime-500/20">
            <span className="text-[9px] font-black text-slate-500 uppercase">Total Inventory Value</span>
            <span className="text-xl font-black text-lime-400 mono-font">$4,210,800.50</span>
          </div>
          <button className="bg-lime-600/20 border border-lime-500/30 p-4 rounded-2xl hover:bg-lime-600/40 transition-all group">
            <Icons.Plus className="text-lime-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Stock Levels Chart */}
        <div className="col-span-12 lg:col-span-8 glass-panel electric-border p-10 rounded-[3rem] h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">Global Stock Allocation</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> <span className="text-[8px] font-black uppercase text-slate-500">On Hand</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500" /> <span className="text-[8px] font-black uppercase text-slate-500">Reserved</span></div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#02001a', border: '1px solid #ffffff10' }} />
                <Bar dataKey="onHand" radius={[6, 6, 0, 0]}>
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} />
                  ))}
                </Bar>
                <Bar dataKey="reserved" fill="#d946ef" radius={[6, 6, 0, 0]} fillOpacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warehouse Status */}
        <div className="col-span-12 lg:col-span-4 space-y-6 h-[450px] overflow-y-auto no-scrollbar">
          {warehouses.map((wh, idx) => (
            <div key={wh.id} className="glass-panel electric-border p-8 rounded-[2rem] group hover:scale-[1.02] transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-base font-black text-white heading-font">{wh.name}</h4>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{wh.id}</p>
                </div>
                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${wh.status === 'Critical' ? 'bg-pink-500/20 text-pink-500' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {wh.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Occupancy</span>
                  <span className="text-white mono-font">{wh.occupancy}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${wh.occupancy > 90 ? 'bg-pink-500' : 'bg-blue-500'}`} 
                    style={{ width: `${wh.occupancy}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Trail & Quick Actions */}
        <div className="col-span-12 glass-panel electric-border rounded-[2.5rem] overflow-hidden mt-4">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-10 py-6">Timestamp</th>
                <th className="px-10 py-6">SKU / Item</th>
                <th className="px-10 py-6">Action</th>
                <th className="px-10 py-6">Qty</th>
                <th className="px-10 py-6 text-right">Warehouse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium">
              {[
                { ts: '14:20:01', sku: 'CPU-Q1', action: 'Receipt', qty: '+50', wh: 'WH-ALPHA' },
                { ts: '13:45:12', sku: 'LNK-N4', action: 'Reservation', qty: '-12', wh: 'WH-BETA' },
                { ts: '12:10:55', sku: 'MESH-G2', action: 'Transfer', qty: '100', wh: 'ALPHA -> GAMMA' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all group">
                  <td className="px-10 py-5 mono-font text-slate-500">{log.ts}</td>
                  <td className="px-10 py-5 text-white">{log.sku}</td>
                  <td className="px-10 py-5 text-[10px] uppercase font-black text-slate-400">{log.action}</td>
                  <td className={`px-10 py-5 mono-font ${log.qty.startsWith('+') ? 'text-emerald-400' : 'text-pink-400'}`}>{log.qty}</td>
                  <td className="px-10 py-5 text-right font-black text-slate-500">{log.wh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
