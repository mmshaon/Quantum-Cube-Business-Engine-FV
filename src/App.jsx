import React from 'react';
import { QuantumProvider, useQuantum } from './context/QuantumContext';
import VirtualWorld from './components/VirtualWorld';
import StrategyStudio from './components/StrategyStudio';
import AutomationDesigner from './components/AutomationDesigner';
import ExecutiveIntelligence from './components/ExecutiveIntelligence';
import GlobalCore from './components/VirtualWorld';
import VoiceInterface from './components/VoiceInterface';
import { LayoutGrid, Shield, Cpu, Activity, Database, Globe } from 'lucide-react';

const QuantumConsole = () => {
  const { isGodMode, setIsGodMode, activeModule, setActiveModule, systemLogs } = useQuantum();

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isGodMode ? 'bg-[#0a0000]' : 'bg-[#02040a]'} text-white p-4 font-sans`}>
      {/* Module Sidebar (1.0 - 24.0) */}
      <div className="fixed left-0 top-0 h-full w-16 bg-black/40 border-r border-white/5 flex flex-col items-center py-8 gap-6 z-50 backdrop-blur-md">
        <Cpu className={isGodMode ? "text-red-500" : "text-[#00FFA3]"} size={28} />
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
          {[1, 5, 6, 7, 11, 13, 14, 21].map(m => (
            <button key={m} onClick={() => setActiveModule(`${m}.0`)} 
              className={`p-3 rounded-xl transition-all ${activeModule === `${m}.0` ? 'bg-[#00FFA3]/20 text-[#00FFA3]' : 'hover:bg-white/5 text-gray-500'}`}>
              <span className="text-[10px] font-black">{m}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setIsGodMode(!isGodMode)} className={`p-4 rounded-full border ${isGodMode ? 'border-red-500 shadow-[0_0_15px_red]' : 'border-white/10'}`}>
           <Shield size={20} className={isGodMode ? "text-red-500" : "text-gray-500"} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="pl-20 grid grid-cols-12 gap-6">
        <header className="col-span-12 flex justify-between items-center mb-4 border-b border-white/5 pb-4">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-[#00FFA3]">QCBE OS : MAX UPGRADE</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Master Identity: Mohammod Maynul Hasan</p>
          </div>
          <div className="flex gap-4 items-center">
            <VoiceInterface isGodMode={isGodMode} />
            <div className="bg-white/5 px-4 py-2 rounded-full border border-white/5 text-[10px] font-mono">
              v2.3.0_STABLE
            </div>
          </div>
        </header>

        {/* Center: Virtual World Rendering */}
        <div className="col-span-8 space-y-6">
          <VirtualWorld isGodMode={isGodMode} />
          <div className="grid grid-cols-3 gap-4">
             {['Executive Intelligence', 'Multi-Cube Patterns', 'Global Core'].map(title => (
               <div key={title} className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-[#00FFA3]/30 transition-all group">
                 <Activity size={20} className="text-[#00FFA3] mb-3 group-hover:scale-110 transition-transform" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</h4>
                 <p className="text-xs mt-1 text-white/60 italic">Ready for command...</p>
               </div>
             ))}
          </div>
        </div>

        {/* Right: Master Logs & Status */}
        <div className="col-span-4 space-y-6">
          <div className="bg-black/60 rounded-[2.5rem] p-6 border border-white/5 h-[400px] flex flex-col">
            <h3 className="text-[10px] font-black mb-4 flex items-center gap-2"><Database size={12}/> SYSTEM LOGS</h3>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[9px] opacity-70">
              {systemLogs.map((log, i) => <div key={i} className={log.includes('[OK]') ? 'text-[#00FFA3]' : ''}>{log}</div>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default () => <QuantumProvider><QuantumConsole /></QuantumProvider>;
