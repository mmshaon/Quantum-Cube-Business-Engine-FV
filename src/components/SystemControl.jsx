import React, { useState } from 'react';
import { Settings, Shield, Eye, EyeOff, Lock, Fingerprint, Database } from 'lucide-react';

const SystemControl = ({ isGodMode }) => {
  const [modules, setModules] = useState([
    { id: '1.0', name: 'Identity Engine', enabled: true },
    { id: '7.0', name: 'Finance Hub', enabled: true },
    { id: '13.0', name: 'Voice Control', enabled: true },
    { id: '15.0', name: 'Global Core', enabled: true }
  ]);

  return (
    <div className="p-8 bg-[#02040a] rounded-[3rem] border border-white/5 relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className={`text-3xl font-black italic tracking-tighter ${isGodMode ? 'text-red-500' : 'text-blue-500'}`}>
            21.0 SYSTEM CONTROL
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">Centralized Module Management</p>
        </div>
        <Settings size={30} className={isGodMode ? 'text-red-500 animate-spin-slow' : 'text-blue-500'} />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Module Toggles */}
        <div className="col-span-7 space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4 flex items-center gap-2">
            <Lock size={14}/> Module Visibility Control
          </h3>
          {modules.map((m) => (
            <div key={m.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-blue-400">{m.id}</span>
                <span className="text-sm font-bold text-white/80">{m.name}</span>
              </div>
              <button 
                onClick={() => {}} 
                className={`p-2 rounded-lg transition-all ${m.enabled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/10 text-gray-600'}`}
              >
                {m.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          ))}
        </div>

        {/* Security Settings Panel */}
        <div className="col-span-5 space-y-6">
          <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
            <h3 className="text-[10px] font-black text-blue-400 uppercase mb-4 flex items-center gap-2">
              <Shield size={14}/> Security Policy (24.2)
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-400">Biometric Auth</span>
                 <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-400">Force God Mode Logout</span>
                 <span className="text-[10px] font-mono text-gray-600 italic underline cursor-pointer">Configure</span>
               </div>
            </div>
          </div>

          <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
            <h3 className="text-[10px] font-black text-purple-400 uppercase mb-4 flex items-center gap-2">
              <Database size={14}/> System Health
            </h3>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
               <div className="w-[94%] h-full bg-purple-500 shadow-[0_0_10px_purple]"></div>
            </div>
            <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-tighter text-right">94% Storage Optimized</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemControl;
