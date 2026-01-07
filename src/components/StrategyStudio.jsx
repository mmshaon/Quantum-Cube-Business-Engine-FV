import React, { useState } from 'react';
import { Target, Zap, ShieldAlert, ChevronRight, Lightbulb } from 'lucide-react';

const StrategyStudio = ({ isGodMode }) => {
  const [activeGoal, setActiveGoal] = useState("Market Dominance 2026");

  const phases = [
    { id: 1, title: "Quantum Analysis", status: "Completed", desc: "Analyzing cross-cube data patterns." },
    { id: 2, title: "Resource Allocation", status: "Active", desc: "Setting up automated financial pipelines." },
    { id: 3, title: "Global Scaling", status: "Pending", desc: "Expanding to Module 15.0 Global Core." }
  ];

  return (
    <div className="p-8 bg-[#0a0a1f]/80 border border-white/5 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-pink-500" size={16} />
            <span className="text-[10px] font-black tracking-[0.4em] text-pink-500 uppercase">Strategy Studio</span>
          </div>
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            {activeGoal}
          </h2>
        </div>
        <div className={`px-4 py-2 rounded-full border ${isGodMode ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-[#00FFA3] text-[#00FFA3] bg-[#00FFA3]/10'} text-[10px] font-bold`}>
          GOD_MODE_PRIORITY
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Execution Phases */}
        <div className="col-span-8 space-y-4">
          {phases.map((p) => (
            <div key={p.id} className="group relative p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${p.status === 'Completed' ? 'bg-[#00FFA3] text-black' : 'bg-white/10 text-white'}`}>
                    {p.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-widest text-xs">{p.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-1">{p.desc}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-700 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Insights & Risks */}
        <div className="col-span-4 space-y-6">
          <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
            <div className="flex items-center gap-2 mb-4 text-red-500">
              <ShieldAlert size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Risk Assessment</span>
            </div>
            <p className="text-xs text-gray-400 italic leading-relaxed">
              "Master Maynul, Module 15.0 integration requires 20% more liquidity than currently allocated."
            </p>
          </div>

          <div className="p-6 bg-[#00FFA3]/5 border border-[#00FFA3]/10 rounded-3xl">
            <div className="flex items-center gap-2 mb-4 text-[#00FFA3]">
              <Lightbulb size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Yusra Idea Generator</span>
            </div>
            <button className="w-full py-3 bg-[#00FFA3] text-black rounded-xl font-black text-[10px] hover:scale-95 transition-transform uppercase">
              Generate New Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyStudio;
