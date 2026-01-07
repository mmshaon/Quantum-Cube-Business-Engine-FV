import React from 'react';
import { Bot, Zap, Settings, Play, Pause } from 'lucide-react';

const AutomationDesigner = ({ isGodMode }) => {
  const automations = [
    { id: 1, name: "Auto-Invoice Generator", trigger: "Every 30 Days", status: "Active" },
    { id: 2, name: "Predictive Risk Alert", trigger: "Revenue Drop > 10%", status: "Active" }
  ];

  return (
    <div className="p-8 bg-black/60 border border-white/5 rounded-[3rem] backdrop-blur-2xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isGodMode ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
            <Bot size={20} className={isGodMode ? 'text-red-500' : 'text-blue-400'} />
          </div>
          <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">9.0 Automation Engine</h2>
        </div>
        <Settings className="text-gray-600 hover:rotate-90 transition-all cursor-pointer" />
      </div>

      <div className="space-y-4">
        {automations.map(auto => (
          <div key={auto.id} className="group p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-4">
              <Zap size={16} className="text-yellow-400" />
              <div>
                <h4 className="font-bold text-sm text-white/90">{auto.name}</h4>
                <p className="text-[10px] text-gray-500 font-mono italic">Trigger: {auto.trigger}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black px-3 py-1 bg-green-500/10 text-green-500 rounded-full">RUNNING</span>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                {auto.status === "Active" ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className={`w-full mt-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest border transition-all ${isGodMode ? 'border-red-500/50 hover:bg-red-500/10 text-red-500' : 'border-blue-500/50 hover:bg-blue-500/10 text-blue-400'}`}>
        + Create New Automation Rule
      </button>
    </div>
  );
};

export default AutomationDesigner;
