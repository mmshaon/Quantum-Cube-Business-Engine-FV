import React from 'react';
import { Globe, MapPin, Share2, ShieldCheck, Zap } from 'lucide-react';

const GlobalCore = ({ isGodMode }) => {
  return (
    <div className="p-8 bg-[#050510] rounded-[3rem] border border-white/5 relative overflow-hidden group">
      {/* Animated Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-20 w-full -translate-y-full group-hover:animate-scanline pointer-events-none" />

      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className={`text-3xl font-black italic tracking-tighter ${isGodMode ? 'text-red-500' : 'text-[#00D4FF]'}`}>
            15.0 GLOBAL CORE
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">Network: Multi-Cube Intelligence Linked</p>
        </div>
        <Globe size={40} className={isGodMode ? 'animate-pulse text-red-500' : 'text-cyan-400'} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* World Map Simulation Area */}
        <div className="col-span-12 h-64 bg-black/40 rounded-[2rem] border border-white/5 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative text-center">
             <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute -top-8 left-1/2 -translate-x-1/2" />
             <p className="font-mono text-[10px] text-cyan-500">DHAKA_HQ :: ACTIVE</p>
          </div>
          {/* Multi-Cube Links */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="50%" y1="50%" x2="20%" y2="30%" stroke={isGodMode ? "red" : "#00D4FF"} strokeWidth="1" strokeDasharray="4" />
            <line x1="50%" y1="50%" x2="80%" y2="70%" stroke={isGodMode ? "red" : "#00D4FF"} strokeWidth="1" strokeDasharray="4" />
          </svg>
        </div>

        {/* Region Stats */}
        <div className="col-span-6 p-6 bg-white/5 border border-white/5 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={16} className="text-pink-500" />
            <span className="text-[10px] font-black uppercase">Active Nodes</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs"><span>Asia-Pacific</span><span className="text-[#00FFA3]">Online</span></div>
            <div className="flex justify-between text-xs text-gray-500"><span>Europe</span><span>Deploying...</span></div>
          </div>
        </div>

        {/* Multi-Cube Sync Status */}
        <div className="col-span-6 p-6 bg-white/5 border border-white/5 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Share2 size={16} className="text-yellow-400" />
            <span className="text-[10px] font-black uppercase">Cube Sync (11.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#00FFA3] animate-bounce" />
            <p className="text-[11px] italic text-gray-400">Knowledge sharing between CUBE-A1 and CUBE-F7 active.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCore;
