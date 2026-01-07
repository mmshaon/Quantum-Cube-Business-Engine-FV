import React from 'react';
import { QuantumProvider, useQuantum } from './context/QuantumContext';
import VirtualWorld from './components/VirtualWorld';
import ProjectStudio from './components/ProjectStudio';
import StrategyStudio from './components/StrategyStudio';
import FinanceModule from './components/FinanceModule';
import AutomationDesigner from './components/AutomationDesigner';
import ExecutiveIntelligence from './components/ExecutiveIntelligence';
import GlobalCore from './components/GlobalCore';
import DataEditor from './components/DataEditor';
import SystemControl from './components/SystemControl';

const QuantumConsole = () => {
  const { isGodMode, setIsGodMode, activeModule, setActiveModule } = useQuantum();

  const renderContent = () => {
    if (activeModule === "5.0") return <ProjectStudio isGodMode={isGodMode} />;
    if (activeModule === "6.0") return <StrategyStudio isGodMode={isGodMode} />;
    if (activeModule === "7.0") return <FinanceModule data={{current_balance: "12500", yusra_insight: "Normal"}} />;
    if (activeModule === "9.0") return <AutomationDesigner isGodMode={isGodMode} />;
    if (activeModule === "10.0") return <ExecutiveIntelligence isGodMode={isGodMode} />;
    if (activeModule === "15.0") return <GlobalCore isGodMode={isGodMode} />;
    if (activeModule === "16.0") return <DataEditor isGodMode={isGodMode} />;
    if (activeModule === "21.0") return <SystemControl isGodMode={isGodMode} />;
    return <VirtualWorld isGodMode={isGodMode} />;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: isGodMode ? '#1a0000' : '#02040a', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '80px', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '20px' }}>
        <div style={{ color: '#00FFA3', fontWeight: 'bold' }}>QCBE</div>
        {['5.0', '6.0', '7.0', '9.0', '10.0', '15.0', '16.0', '21.0'].map(m => (
          <button 
            key={m} 
            onClick={() => setActiveModule(m)}
            style={{ 
              width: '40px', height: '40px', borderRadius: '8px', 
              background: activeModule === m ? '#00FFA3' : '#333',
              color: activeModule === m ? 'black' : 'white',
              cursor: 'pointer', border: 'none', fontSize: '10px', fontWeight: 'bold'
            }}
          >
            {m.split('.')[0]}
          </button>
        ))}
        <button onClick={() => setIsGodMode(!isGodMode)} style={{ marginTop: 'auto', padding: '10px', borderRadius: '50%', background: isGodMode ? 'red' : '#333', border: 'none', color: 'white' }}>
          G
        </button>
      </div>

      {/* MAIN VIEW */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <h1 style={{ margin: 0, color: isGodMode ? 'red' : '#00FFA3' }}>QCBE MAX ENGINE</h1>
          <p style={{ fontSize: '12px', color: '#666' }}>Active Module: {activeModule}</p>
        </header>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '20px', minHeight: '400px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default () => <QuantumProvider><QuantumConsole /></QuantumProvider>;
