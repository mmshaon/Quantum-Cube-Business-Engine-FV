
import React, { useState } from 'react';
import { Icons } from '../constants';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const Sales: React.FC = () => {
  const [data] = useState(Array.from({ length: 20 }, (_, i) => ({
    name: i,
    revenue: 12000 + Math.random() * 8000,
    velocity: 50 + Math.random() * 40
  })));

  const orders = [
    { id: 'SO-9001', customer: 'Global Tech', total: 45000, status: 'Fulfilling', priority: 'High' },
    { id: 'SO-9002', customer: 'Stark Ind.', total: 128000, status: 'Shipped', priority: 'Critical' },
    { id: 'SO-9003', customer: 'Oscorp', total: 32000, status: 'Confirmed', priority: 'Medium' },
    { id: 'SO-9004', customer: 'Wayne Ent.', total: 95000, status: 'Delivered', priority: 'Low' },
  ];

  return (
    <div className="relative text-white min-h-screen p-6 lg:p-10 select-none animate-in fade-in duration-700">
      <header className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 uppercase">
            Sales Velocity Engine
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mono-font">Order-to-Cash Optimization Hub</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-end border-orange-500/20">
            <span className="text-[9px] font-black text-slate-500 uppercase">Quarterly Revenue</span>
            <span className="text-xl font-black text-orange-400 mono-font">$1,850,240.00</span>
          </div>
          <button className="bg-orange-600/20 border border-orange-500/30 p-4 rounded-2xl hover:bg-orange-600/40 transition-all">
            <Icons.Plus className="text-orange-400" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Revenue Velocity Chart */}
        <div className="col-span-12 lg:col-span-8 glass-panel electric-border p-10 rounded-[3rem] h-[400px] flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-10">Revenue Velocity Flux</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <Tooltip contentStyle={{ background: '#02001a', border: '1px solid #ffffff10' }} />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="url(#salesGrad)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fulfillment Center */}
        <div className="col-span-12 lg:col-span-4 glass-panel electric-border p-8 rounded-[3rem] flex flex-col justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-8 text-center">Fulfillment Hub</h3>
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/10 blur-[40px] rounded-full animate-pulse" />
              <Icons.Truck size={64} className="text-orange-400 float-item" />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                { l: 'Pending', v: '14', c: 'text-orange-400' },
                { l: 'In Transit', v: '42', c: 'text-blue-400' },
                { l: 'Delivered', v: '840', c: 'text-emerald-400' },
                { l: 'Returns', v: '3', c: 'text-pink-400' }
              ].map((s, i) => (
                <div key={i} className="text-center p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[7px] text-slate-600 font-black uppercase tracking-widest mb-1">{s.l}</div>
                  <div className={`text-lg font-black mono-font ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Orders Table */}
        <div className="col-span-12 glass-panel electric-border rounded-[2.5rem] overflow-hidden mt-4">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-10 py-6">Order ID</th>
                <th className="px-10 py-6">Customer</th>
                <th className="px-10 py-6">Total Amount</th>
                <th className="px-10 py-6">Priority</th>
                <th className="px-10 py-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all group">
                  <td className="px-10 py-5 mono-font text-slate-400">{order.id}</td>
                  <td className="px-10 py-5 text-white">{order.customer}</td>
                  <td className="px-10 py-5 text-orange-400 mono-font">${order.total.toLocaleString()}</td>
                  <td className="px-10 py-5">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded 
                      ${order.priority === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-slate-500/20 text-slate-400'}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-10 py-5 text-right font-black text-slate-500">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
