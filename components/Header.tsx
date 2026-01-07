
import React from 'react';
import { ModuleType } from '../types';
import { MODULES } from '../constants';

interface HeaderProps {
  activeModule: ModuleType;
}

const Header: React.FC<HeaderProps> = ({ activeModule }) => {
  const currentModule = MODULES.find(m => m.id === activeModule);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <div className="text-slate-400">
          {currentModule?.icon}
        </div>
        <h2 className="text-lg font-semibold text-slate-100">
          {currentModule?.label || 'Engine'}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-100">Chief Executive</span>
          <span className="text-xs text-slate-400 font-medium">Global Admin</span>
        </div>
        <div className="w-10 h-10 bg-slate-800 rounded-full border-2 border-slate-700 shadow-sm overflow-hidden">
          <img src="https://picsum.photos/40/40?random=1" alt="Avatar" className="w-full h-full object-cover grayscale-[20%]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
