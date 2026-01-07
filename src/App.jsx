import React, { useState } from 'react';

const Box = ({ title, color, desc }) => (
  <div style={{ padding: '30px', border: `2px solid ${color}`, borderRadius: '20px', background: 'rgba(255,255,255,0.05)', marginTop: '20px' }}>
    <h2 style={{ color: color, margin: '0 0 10px 0' }}>{title}</h2>
    <p style={{ opacity: 0.7 }}>{desc}</p>
  </div>
);

export default function App() {
  const [active, setActive] = useState('MAIN');
  const [god, setGod] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: god ? '#1a0000' : '#02040a', fontFamily: 'sans-serif', color: 'white' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '80px', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '15px' }}>
        <div style={{ color: '#00FFA3', fontWeight: 'bold', marginBottom: '20px' }}>QCBE</div>
        {['5', '6', '7', '9', '10', '15', '21'].map(num => (
          <button key={num} onClick={() => setActive(num)} style={{
            width: '45px', height: '45px', borderRadius: '12px', cursor: 'pointer', border: 'none',
            background: active === num ? '#00FFA3' : '#222',
            color: active === num ? 'black' : 'white',
            fontWeight: 'bold'
          }}>{num}</button>
        ))}
        <button onClick={() => setGod(!god)} style={{ marginTop: 'auto', padding: '10px', borderRadius: '50%', background: god ? 'red' : '#333', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>G</button>
      </div>

      {/* CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, color: god ? 'red' : '#00FFA3' }}>QCBE MAX SYSTEM</h1>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.5 }}>CREATOR: MOHAMMAD MAYNUL HASAN</p>
          </div>
          <div style={{ padding: '10px 20px', background: '#111', borderRadius: '30px', border: '1px solid #333', fontSize: '12px' }}>
            STATUS: <span style={{ color: '#00FFA3' }}>SYSTEM_ACTIVE</span>
          </div>
        </div>

        <div style={{ minHeight: '400px' }}>
          {active === 'MAIN' && (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <h2 style={{ fontSize: '40px', opacity: 0.2 }}>YUSRA FV ACTIVE</h2>
              <p>Select a Module from the sidebar to begin execution.</p>
            </div>
          )}
          {active === '5' && <Box title="5.0 Project Studio" color="#00FFA3" desc="Managing 12 active cubes. All systems operational." />}
          {active === '6' && <Box title="6.0 Strategy Engine" color="#ff00ff" desc="Market analysis complete. 92% ROI projection generated." />}
          {active === '7' && <Box title="7.0 Finance Hub" color="#ffd700" desc="Total Balance: $12,500.00 | Net Growth: +14%." />}
          {active === '9' && <Box title="9.0 Automation Engine" color="#00d4ff" desc="14 Background tasks are running autonomously." />}
          {active === '10' && <Box title="10.0 Executive Intel" color="red" desc="High-level decision mode active. Reporting to Creator." />}
          {active === '15' && <Box title="15.0 Global Core" color="#ff8c00" desc="Nodes active in 2 regions. Global sync enabled." />}
          {active === '21' && <Box title="21.0 System Control" color="#ffffff" desc="Configure module visibility and security protocols." />}
        </div>
      </div>
    </div>
  );
}
