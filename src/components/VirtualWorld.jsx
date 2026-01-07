import React from 'react';
import { motion } from 'framer-motion';

const VirtualWorld = ({ isGodMode }) => {
  return (
    <div className="relative w-full h-64 bg-black rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
      {/* 3D Perspective Grid */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          perspective: '600px',
          background: isGodMode 
            ? 'radial-gradient(circle, rgba(255,0,0,0.1) 0%, black 100%)' 
            : 'radial-gradient(circle, rgba(0,255,163,0.1) 0%, black 100%)'
        }}
      >
        <motion.div 
          animate={{ 
            rotateX: 60,
            y: [0, -40, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${isGodMode ? '#ff000044' : '#00ffa344'} 1px, transparent 1px), 
                              linear-gradient(90deg, ${isGodMode ? '#ff000044' : '#00ffa344'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transformOrigin: 'center top'
          }}
        />
      </div>

      {/* Floating Executive KPI in 3D Space */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`p-6 rounded-2xl backdrop-blur-xl border ${isGodMode ? 'border-red-500/50 bg-red-500/10' : 'border-cyan-500/50 bg-cyan-500/10'} text-center`}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">System Core</p>
          <h2 className={`text-2xl font-black ${isGodMode ? 'text-red-500' : 'text-[#00FFA3]'}`}>STABLE</h2>
        </motion.div>
      </div>

      {/* Mode Badge */}
      <div className="absolute bottom-4 left-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full animate-ping ${isGodMode ? 'bg-red-500' : 'bg-[#00FFA3]'}`} />
        <span className="text-[9px] font-mono opacity-50">VIRTUAL_RENDER_V2.3</span>
      </div>
    </div>
  );
};

export default VirtualWorld;
