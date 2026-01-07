import React from 'react';
import { QuantumProvider, useQuantum } from './context/QuantumContext';
import VirtualWorld from './components/VirtualWorld';
import VoiceInterface from './components/VoiceInterface';
import ProjectStudio from './components/ProjectStudio';
import StrategyStudio from './components/StrategyStudio';
import FinanceModule from './components/FinanceModule';
import AutomationDesigner from './components/AutomationDesigner';
import ExecutiveIntelligence from './components/ExecutiveIntelligence';
import GlobalCore from './components/GlobalCore';
import DataEditor from './components/DataEditor';
import SystemControl from './components/SystemControl';
import { Cpu, Shield, Database, Layout } from 'lucide-react';

const QuantumConsole = () => {
  const { isGodMode, setIsGodMode, activeModule, setActiveModule, systemLogs } = useQuantum();

  // মডিউল রেন্ডারিং লজিক
  const renderModule = () => {
    switch(activeModule) {
      case '5.0': return <ProjectStudio isGodMode={isGodMode} />;
      case '6.0': return <StrategyStudio isGodMode={isGodMode} />;
      case '7.0': return <FinanceModule data={{current_balance: 12500, yusra_insight: "System Stable"}} />;
      case '9.0': return <AutomationDesigner isGodMode={isGodMode} />;
      case '10.0': return <ExecutiveIntelligence isGodMode={isGodMode} />;
      case '15.0': return <GlobalCore isGodMode={isGodMode} />;
      case '16.0': return <DataEditor isGodMode={isGodMode} />;
      case '21.0': return <SystemControl isGodMode={isGodMode} />;
      default: return <VirtualWorld isGodMode={isGodMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isGodMode ? 'bg-[#0a0000]' : 'bg-[#02040a]'} text-white p-4 font-sans`}>
      
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-20 bg-black/40 border-r border-white/5 flex flex-col items-center py-8 gap-6 z-50 backdrop-blur-md">
        <Cpu className={isGodMode ? "text-red-500" : "text-[#00FFA3]"} size={28} />
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-4">
          {['5.0', '6.0', '7.0', '9.0', '10.0', '15.0', '16.0', '21.0'].map(m => (
            <button key={m} onClick={() => setActiveModule(m)} 
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeModule === m ? 'bg-[#00FFA3]/20 text-[#00FFA3] border border-[#00FFA3]/50' : 'hover:bg-white/5 text-gray-500'}`}>
              <span className="text-[10px] font-black">{m.split('.')[0]}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setIsGodMode(!isGodMode)} className={`p-4 rounded-full border ${isGodMode ? 'border-red-500 shadow-[0_0_20px_red]' : 'border-white/10'}`}>
           <Shield size={20} className={isGodMode ? "text-red-500" : "text-gray-500"} />
        </button>
      </div>

      {/* Content Main Area */}
      <main className="ml-24 grid grid-cols-12 gap-6">
        <header className="col-span-12 flex justify-between items-center mb-4 border-b border-white/5 pb-4">
          <div>
            <h1 className={`text-2xl font-black tracking-tighter ${isGodMode ? 'text-red-500' : 'text-[#00FFA3]'}`}>QCBE OS : MAX UPGRADE</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Creator: Mohammod Maynul Hasan</p>
          </div>
          <div className="flex gap-4 items-center">
            <VoiceInterface isGodMode={isGodMode} />
            <div className="bg-white/5 px-4 py-2 rounded-full border border-white/5 text-[10px] font-mono">
              SYSTEM_READY_V2.3
            </div>
          </div>
        </header>

        {/* Dynamic Module Display */}
        <div className="col-span-12 lg:col-span-9 animate-in fade-in duration-700">
          {renderModule()}
        </div>

        {/* Logs Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-black/60 rounded-[2.5rem] p-6 border border-white/5 h-[500px] flex flex-col">
            <h3 className="text-[10px] font-black mb-4 flex items-center gap-2 text-gray-400"><Database size={12}/> SYSTEM LOGS</h3>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[9px] opacity-60">
              {systemLogs.map((log, i) => <div key={i} className={log.includes('[OK]') ? 'text-[#00FFA3]' : ''}>{log}</div>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default () => <QuantumProvider><QuantumConsole /></QuantumProvider>;
