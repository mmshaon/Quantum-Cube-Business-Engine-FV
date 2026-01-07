import React, { useState } from 'react';

export default function App() {
  const [tab, setTab] = useState('MAIN');
  const [isGod, setIsGod] = useState(false);

  const modules = {
    '5': { t: '5.0 Project Studio', c: '#00FFA3', d: 'Mastering 12 active cubes.' },
    '6': { t: '6.0 Strategy Studio', c: '#ff00ff', d: '92% ROI projection active.' },
    '7': { t: '7.0 Finance Hub', c: '#ffd700', d: 'Balance: $12,500.00' },
    '9': { t: '9.0 Automation', c: '#00d4ff', d: '14 tasks running.' },
    '10': { t: '10.0 Intel', c: 'red', d: 'God Mode: Executive reporting.' },
    '15': { t: '15.0 Global Core', c: '#ff8c00', d: 'Nodes: Dhaka HQ, Global Sync.' },
    '21': { t: '21.0 Control', c: 'white', d: 'System security & UI configs.' }
  };

  return (
    <div style={{ 
      display: 'flex', minHeight: '100vh', width: '100vw', 
      background: isGod ? '#200' : '#02040a', color: 'white', fontFamily: 'Arial' 
    }}>
      {/* SIDEBAR */}
      <div style={{ width: '80px', background: '#000', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
        <b style={{ color: '#00FFA3', marginBottom: '30px' }}>QCBE</b>
        {Object.keys(modules).map(m => (
          <button key={m} onClick={() => setTab(m)} style={{
            width: '40px', height: '40px', margin: '5px 0', cursor: 'pointer',
            background: tab === m ? '#00FFA3' : '#222',
            color: tab === m ? 'black' : 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold'
          }}>{m}</button>
        ))}
        <button onClick={() => setIsGod(!isGod)} style={{ 
          marginTop: 'auto', width: '40px', height: '40px', borderRadius: '50%', 
          background: isGod ? 'red' : '#333', color: 'white', border: 'none', cursor: 'pointer' 
        }}>G</button>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, color: isGod ? 'red' : '#00FFA3' }}>QCBE MAX SYSTEM</h1>
            <p style={{ margin: 0, opacity: 0.5, fontSize: '12px' }}>CREATOR: MOHAMMAD MAYNUL HASAN</p>
          </div>
          <div style={{ padding: '10px', background: '#111', borderRadius: '10px', border: '1px solid #333' }}>
            STATUS: <span style={{ color: '#00FFA3' }}>ACTIVE</span>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          {tab === 'MAIN' ? (
            <div style={{ textAlign: 'center', opacity: 0.3, marginTop: '100px' }}>
              <h2>YUSRA BRAIN LOADED</h2>
              <p>Click any module number to start.</p>
            </div>
          ) : (
            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: `2px solid ${modules[tab].c}` }}>
              <h2 style={{ color: modules[tab].c }}>{modules[tab].t}</h2>
              <p style={{ fontSize: '18px' }}>{modules[tab].d}</p>
              <hr style={{ opacity: 0.1, margin: '20px 0' }} />
              <button style={{ padding: '10px 20px', background: modules[tab].c, border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                Execute Command
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
