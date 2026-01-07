import React from 'react';
import { Brain, Zap, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';

const ExecutiveIntelligence = ({ isGodMode }) => {
  return (
    <div className="p-8 space-y-8 bg-[#02040a] rounded-[3rem] border border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[120px] ${isGodMode ? 'bg-red-500/20' : 'bg-[#00FFA3]/10'}`} />

      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-black italic tracking-tighter ${isGodMode ? 'text-red-500' : 'text-[#00FFA3]'}`}>
            10.0 EXECUTIVE INTELLIGENCE
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] mt-1">Status: Hyper-Analysis Mode Active</p>
        </div>
        <Brain size={32} className={isGodMode ? 'text-red-500' : 'text-[#00FFA3]'} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Insight Card */}
        <div className="col-span-12 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl relative group">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-red-500 text-white text-[9px] font-black rounded-full">CRITICAL INSIGHT</span>
            <span className="text-gray-500 text-[10px] font-mono">ID: QC-INTEL-095</span>
          </div>
          <p className="text-xl font-medium leading-relaxed text-white/90 italic">
            "Master Maynul, based on current cross-cube patterns, your ROI is projected to increase by 22% if we automate Module 7.0 transactions by tomorrow."
          </p>
          <div className="mt-8 flex gap-4">
            <button className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${isGodMode ? 'bg-red-600 text-white' : 'bg-[#00FFA3] text-black hover:scale-105'}`}>
              Execute Optimization
            </button>
            <button className="px-6 py-3 rounded-xl font-black text-[10px] uppercase border border-white/10 text-white hover:bg-white/5">
              Simulate Impact
            </button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="col-span-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
          <div className="flex items-center gap-3 text-cyan-400 mb-2">
            <TrendingUp size={16} />
            <span className="text-[10px] font-black uppercase">Growth Rate</span>
          </div>
          <h3 className="text-2xl font-black">+14.8%</h3>
        </div>

        <div className="col-span-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase">System Stability</span>
          </div>
          <h3 className="text-2xl font-black text-emerald-400">99.9%</h3>
        </div>

        <div className="col-span-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <Zap size={16} />
            <span className="text-[10px] font-black uppercase">Automation Load</span>
          </div>
          <h3 className="text-2xl font-black">42%</h3>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveIntelligence;
