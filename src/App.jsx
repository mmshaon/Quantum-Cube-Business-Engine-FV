import React, { Suspense, lazy } from 'react';
import { QuantumProvider, useQuantum } from './context/QuantumContext';
import { Cpu, Shield, Database, Layout, Loader2 } from 'lucide-react';

// Lazy Loading Components for better performance
const VirtualWorld = lazy(() => import('./components/VirtualWorld'));
const VoiceInterface = lazy(() => import('./components/VoiceInterface'));
const ProjectStudio = lazy(() => import('./components/ProjectStudio'));
const StrategyStudio = lazy(() => import('./components/StrategyStudio'));
const FinanceModule = lazy(() => import('./components/FinanceModule'));
const AutomationDesigner = lazy(() => import('./components/AutomationDesigner'));
const ExecutiveIntelligence = lazy(() => import('./components/ExecutiveIntelligence'));
const GlobalCore = lazy(() => import('./components/GlobalCore'));
const DataEditor = lazy(() => import('./components/DataEditor'));
const SystemControl = lazy(() => import('./components/SystemControl'));

const QuantumConsole = () => {
  const { isGodMode, setIsGodMode, activeModule, setActiveModule, systemLogs } = useQuantum();

  // মডিউল সিলেকশন লজিক
  const renderActiveModule = () => {
    switch (activeModule) {
      case '5.0': return <ProjectStudio isGodMode={isGodMode} />;
      case '6.0': return <StrategyStudio isGodMode={isGodMode} />;
      case '7.0': return <FinanceModule data={{current_balance: "12,500", yusra_insight: "Optimized"}} />;
      case '9.0': return <AutomationDesigner isGodMode={isGodMode} />;
      case '10.0': return <ExecutiveIntelligence isGodMode={isGodMode} />;
      case '15.0': return <GlobalCore isGodMode={isGodMode} />;
      case '16.0': return <DataEditor isGodMode={isGodMode} />;
      case '21.0': return <SystemControl isGodMode={isGodMode} />;
      default: return <VirtualWorld isGodMode={isGodMode} />;
    }
  };

  return (
    <div className={`min-h-screen flex transition-all duration-700 ${isGodMode ? 'bg-[#0a0000]' : 'bg-[#02040a]'} text-white font-sans overflow-hidden`}>
      
      {/* 🚀 LEFT SIDEBAR (1.0 - 24.0) */}
      <aside className="w-20 bg-black/50 border-r border-white/5 flex flex-col items-center py-8 gap-8 backdrop-blur-xl z-50">
        <div className="p-3 bg-[#00FFA3]/10 rounded-2xl border border-[#00FFA3]/20">
          <Cpu className={isGodMode ? "text-red-500" : "text-[#00FFA3]"} size={24} />
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-10">
          {['5.0', '6.0', '7.0', '9.0', '10.0', '15.0', '16.0', '21.0'].map((m) => (
            <button
              key={m}
              onClick={() => setActiveModule(m)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                activeModule === m 
                ? 'bg-[#00FFA3] text-black shadow-[0_0_20px_#00FFA3]' 
                : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] font-black">{m.split('.')[0]}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsGodMode(!isGodMode)}
          className={`p-4 rounded-full border-2 transition-all ${isGodMode ? 'border-red-500 shadow-[0_0_25px_red] bg-red-500/20' : 'border-white/10'}`}
        >
          <Shield size={20} className={isGodMode ? "text-red-500" : "text-gray-500"} />
        </button>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden relative">
        <header className="flex justify-between items-center mb-6 border-b border-white/5 pb-6">
          <div>
            <h1 className={`text-3xl font-black tracking-tighter italic ${isGodMode ? 'text-red-500' : 'text-[#00FFA3]'}`}>
              QCBE OS <span className="text-white opacity-20">MAX</span>
            </h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] font-bold">Creator: Mohammad Maynul Hasan</p>
          </div>
          
          <div className="flex items-center gap-6">
             <Suspense fallback={<Loader2 className="animate-spin" />}>
                <VoiceInterface isGodMode={isGodMode} />
             </Suspense>
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
               SYS_STATUS: <span className="text-[#00FFA3]">STABLE</span>
             </div>
          </div>
        </header>

        {/* 🧩 DYNAMIC MODULE CONTAINER */}
        <section className="flex-1 overflow-y-auto no-scrollbar rounded-[3rem] border border-white/5 bg-black/20 p-2">
          <Suspense fallback={
            <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-500">
              <Loader2 className="animate-spin text-[#00FFA3]" size={40} />
              <p className="text-[10px] font-mono tracking-widest">YUSRA IS INITIALIZING MODULE {activeModule}...</p>
            </div>
          }>
            {renderActiveModule()}
          </Suspense>
        </section>
      </main>

      {/* 📜 SYSTEM LOGS (Hidden on small screens) */}
      <aside className="w-80 p-6 bg-black/30 border-l border-white/5 hidden xl:flex flex-col gap-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Database size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">System Logs</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[9px] opacity-40">
          {systemLogs.map((log, i) => (
            <div key={i} className={`p-2 rounded-lg border border-white/5 ${log.includes('[OK]') ? 'text-[#00FFA3]' : ''}`}>
              {log}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default () => <QuantumProvider><QuantumConsole /></QuantumProvider>;
