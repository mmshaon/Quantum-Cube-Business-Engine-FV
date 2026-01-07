import React from 'react';
import { Box, Layers, PlayCircle, Clock } from 'lucide-react';

const ProjectStudio = ({ isGodMode }) => {
  const projects = [
    { id: 1, name: "Core Engine v2.3", progress: 85, cube: "A-1" },
    { id: 2, name: "Finance Automation", progress: 40, cube: "F-7" }
  ];

  return (
    <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-white">5.0 PROJECT STUDIO</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Multi-Cube Intelligence Active</p>
        </div>
        <Layers className={isGodMode ? "text-red-500" : "text-cyan-400"} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map(p => (
          <div key={p.id} className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${isGodMode ? 'bg-red-500/10' : 'bg-cyan-500/10'}`}>
                <Box size={20} className={isGodMode ? 'text-red-500' : 'text-cyan-400'} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white/90">{p.name}</h4>
                <p className="text-[9px] text-gray-500">CUBE ID: {p.cube}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${isGodMode ? 'bg-red-600 shadow-[0_0_10px_red]' : 'bg-[#00FFA3]'}`} 
                  style={{ width: `${p.progress}%` }} 
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400">{p.progress}%</span>
              <PlayCircle size={18} className="text-gray-600 hover:text-[#00FFA3] cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStudio;
