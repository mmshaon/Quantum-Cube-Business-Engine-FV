import React, { useState } from 'react';

// Simplified All-in-One Modules
const ProjectModule = () => <div style={{padding: '20px', border: '1px solid #00FFA3', borderRadius: '15px'}}><h3>5.0 Project Studio</h3><p>Status: All Cubes Active</p></div>;
const StrategyModule = () => <div style={{padding: '20px', border: '1px solid #ff00ff', borderRadius: '15px'}}><h3>6.0 Strategy Engine</h3><p>Analysis: 92% Market Potential</p></div>;
const FinanceModule = () => <div style={{padding: '20px', border: '1px solid #ffd700', borderRadius: '15px'}}><h3>7.0 Finance Hub</h3><p>Balance: $12,500.00</p></div>;
const AutomationModule = () => <div style={{padding: '20px', border: '1px solid #00d4ff', borderRadius: '15px'}}><h3>9.0 Automation</h3><p>Tasks Running: 14</p></div>;
const IntelligenceModule = () => <div style={{padding: '20px', border: '2px solid red', borderRadius: '15px'}}><h3>10.0 Executive Intel</h3><p>God Mode: Enabled</p></div>;

export default function App() {
  const [active, setActive] = useState('MAIN');
  const [god, setGod] = useState(false);

  const modules = [
    {id: '5.0', name: 'Project'},
    {id: '6.0', name: 'Strategy'},
    {id: '7.0', name: 'Finance'},
    {id: '9.0', name: 'Automation'},
    {id: '10.0', name: 'Intel'}
  ];

  return (
    <div style={{ 
      backgroundColor: god ? '#1a0000' : '#02040a', 
      color: 'white', 
      minHeight: '100vh', 
      display: 'flex',
      fontFamily: 'sans-serif' 
    }}>
      {/* SIDEBAR */}
      <div style={{ width: '100px', borderRight: '1px solid #333', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{fontSize: '14px', color: '#00FFA3'}}>QCBE</h2>
        {modules.map(m => (
          <button 
            key={m.id} 
            onClick={() => setActive(m.id)}
            style={{
              padding: '10px 5px',
              backgroundColor: active === m.id ? '#00FFA3' : '#222',
              color: active === m.id ? 'black' : 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 'bold'
            }}
          >
            {m.id}
          </button>
        ))}
        <button 
          onClick={() => setGod(!god)}
          style={{ marginTop: 'auto', padding: '10px', backgroundColor: god ? 'red' : '#444', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer' }}
        >
          {god ? 'GOD' : 'OFF'}
        </button>
      </div>

      {/* CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, letterSpacing: '-1px' }}>SYSTEM <span style={{color: '#00FFA3'}}>MAX</span></h1>
            <p style={{fontSize: '10px', opacity: 0.5}}>CREATOR: MOHAMMAD MAYNUL HASAN</p>
          </div>
          <div style={{fontSize: '12px', background: '#222', padding: '5px 15px', borderRadius: '20px', border: '1px solid #333'}}>
            LIVE_STATUS: <span style={{color: '#00FFA3'}}>READY</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '30px', padding: '30px', minHeight: '300px' }}>
          {active === '5.0' && <ProjectModule />}
          {active === '6.0' && <StrategyModule />}
          {active === '7.0' && <FinanceModule />}
          {active === '9.0' && <AutomationModule />}
          {active === '10.0' && <IntelligenceModule />}
          {active === 'MAIN' && (
            <div style={{textAlign: 'center', paddingTop: '50px'}}>
              <h2 style={{opacity: 0.2, fontSize: '40px'}}>YUSRA CORE ACTIVE</h2>
              <p>Select a Module from Sidebar to Begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
