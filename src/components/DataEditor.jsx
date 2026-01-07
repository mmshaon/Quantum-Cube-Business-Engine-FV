import React, { useState } from 'react';
import { Edit3, Save, Bell, CheckCircle, AlertTriangle } from 'lucide-react';

const DataEditor = ({ isGodMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    projectName: "QCBE Master Engine",
    budget: "50000",
    region: "Asia-Pacific"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Logic to update Neon DB via API
  };

  return (
    <div className="p-8 bg-black/40 border border-white/5 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">
      {/* Top Bar: Notification Preview */}
      <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <Bell className="text-yellow-400 animate-swing" size={18} />
          <span className="text-[10px] font-black uppercase text-gray-400">Latest Notification: System Integrity 99%</span>
        </div>
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_green]"></div>
        </div>
      </div>

      <div className="flex justify-between items-start mb-6">
        <h2 className={`text-2xl font-black italic tracking-tighter ${isGodMode ? 'text-red-500' : 'text-[#00FFA3]'}`}>
          REAL-TIME DATA EDITOR
        </h2>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`p-3 rounded-xl transition-all ${isEditing ? 'bg-green-500 text-black' : 'bg-white/5 text-gray-400'}`}
        >
          {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-2">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input 
              disabled={!isEditing}
              className={`w-full p-4 bg-black/60 border ${isEditing ? 'border-[#00FFA3]/50 text-white' : 'border-white/5 text-gray-500'} rounded-2xl transition-all font-mono text-sm`}
              value={value}
              onChange={(e) => setData({...data, [key]: e.target.value})}
            />
          </div>
        ))}
      </div>

      {isGodMode && (
        <div className="mt-8 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={16} />
          <p className="text-[10px] text-red-500 font-bold uppercase">God Mode: Write Access Enabled for All Cubes</p>
        </div>
      )}
    </div>
  );
};

export default DataEditor;
