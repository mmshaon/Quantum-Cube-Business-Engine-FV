
import React from 'react';
import { MODULES, Icons } from '../constants';
import { ModuleType, Language } from '../types';
import { useLanguage } from './LanguageContext';
import { useTheme, ThemeType } from './ThemeContext';

interface SidebarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isOpen, onToggle }) => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <aside className={`${isOpen ? 'w-80' : 'w-24'} bg-void/95 backdrop-blur-3xl text-slate-300 transition-all duration-500 flex flex-col h-full z-30 border-r border-white/5 shadow-[20px_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex-shrink-0`}>
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/5 via-transparent to-pink-600/5 pointer-events-none" />

      <div className={`p-6 flex items-center gap-4 border-b border-white/5 shrink-0 relative z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div 
          onClick={onToggle}
          className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/10 group cursor-pointer transition-all hover:scale-110 active:scale-95"
        >
          <span className="font-black text-white text-2xl heading-font drop-shadow-lg">Q</span>
        </div>
        {isOpen && (
          <div className={`flex flex-col ${isRtl ? 'text-right' : ''} animate-in fade-in slide-in-from-left duration-500`}>
            <h1 className="font-black text-lg tracking-tighter text-white leading-none heading-font uppercase">Quantum Cube</h1>
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mt-1.5 mono-font">Core v2.5.0</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar relative z-10 px-4">
        <div className="flex flex-col gap-1.5">
          {MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group touch-interactive relative
                ${activeModule === module.id 
                  ? 'bg-white/10 text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] border border-white/10' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}
                ${isRtl ? 'flex-row-reverse' : ''}`}
              title={!isOpen ? module.label : ''}
            >
              {activeModule === module.id && (
                  <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-full shadow-[0_0_15px_#3b82f6] ${isRtl ? 'right-[-8px]' : 'left-[-8px]'}`} />
              )}
              <div className={`shrink-0 transition-all duration-500 ${activeModule === module.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {module.icon}
              </div>
              {isOpen && (
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] truncate text-left flex-1 ${activeModule === module.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} ${isRtl ? 'text-right' : ''}`}>
                  {module.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Language Switcher */}
      <div className={`p-5 border-t border-white/5 space-y-3 relative z-10 bg-slate-900/40 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
           {(['en', 'bn', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`flex-1 py-2 text-[9px] font-black rounded-xl border transition-all uppercase
                  ${language === l 
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                    : 'border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
              >
                {l}
              </button>
           ))}
        </div>
      </div>

      <div className="p-4 border-t border-white/5 bg-slate-950/80 relative z-10">
        <button 
          onClick={onToggle}
          className={`w-full flex items-center justify-center p-3 text-slate-500 hover:text-slate-200 transition-all group touch-interactive rounded-xl hover:bg-white/5`}
        >
          <div className={`transition-transform duration-700 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <Icons.ChevronRight size={18} />
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
