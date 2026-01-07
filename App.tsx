
import React, { useState } from 'react';
import { ModuleType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IdeasIncubator from './components/IdeasLab';
import StrategyRoom from './components/StrategyRoom';
import ProjectDesk from './components/ProjectDesk';
import Reporting from './components/Reporting';
import ScheduleGoals from './components/ScheduleGoals';
import Finance from './components/Finance';
import CRM from './components/CRM';
import HR from './components/HR';
import AdminPanel from './components/AdminPanel';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import SupplyChain from './components/SupplyChain';
import Marketing from './components/Marketing';
import SecurityManagement from './components/SecurityManagement';
import LoginScreen from './components/LoginScreen';
import Submissions from './components/Submissions';
import Notifications from './components/Notifications';
import YusraVoiceOverlay from './components/YusraVoiceOverlay';
import { SecurityProvider, useSecurity } from './components/SecurityContext';
import { MODULES, Icons } from './constants';

const ServiceModeHUD: React.FC = () => {
  const { currentUser } = useSecurity();
  if (!currentUser?.isOwner) return null;
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-pink-500 z-[200] animate-pulse">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 px-4 py-1 bg-pink-600 rounded-b-xl border border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2">
        <Icons.ShieldAlert size={10} className="text-white animate-spin-slow" />
        <span className="text-[8px] font-black text-white uppercase tracking-[0.3em] mono-font">Service Mode Active: Global Neural Override</span>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authState, currentUser } = useSecurity();

  if (authState !== 'AUTHORIZED') return <LoginScreen />;

  const renderModule = () => {
    const isAdmin = currentUser?.role === 'admin' || currentUser?.isOwner;
    
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <Dashboard />;
      case ModuleType.SUBMISSIONS: return <Submissions />;
      case ModuleType.NOTIFICATIONS: return <Notifications />;
      case ModuleType.IDEAS: return <IdeasIncubator />;
      case ModuleType.PLANNING: return <StrategyRoom />;
      case ModuleType.PROJECTS: return <ProjectDesk />;
      case ModuleType.REPORTING: return isAdmin ? <Reporting /> : <Dashboard />;
      case ModuleType.SCHEDULE: return <ScheduleGoals />;
      case ModuleType.FINANCE: return <Finance />;
      case ModuleType.CRM: return <CRM />;
      case ModuleType.HR: return <HR />;
      case ModuleType.INVENTORY: return <Inventory />;
      case ModuleType.SALES: return <Sales />;
      case ModuleType.SUPPLY_CHAIN: return <SupplyChain />;
      case ModuleType.MARKETING: return <Marketing />;
      case ModuleType.SETTINGS: return isAdmin ? <AdminPanel /> : <Dashboard />;
      case ModuleType.SECURITY: return isAdmin ? <SecurityManagement /> : <Dashboard />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#02001a] text-slate-100 overflow-hidden font-outfit select-none relative">
      <ServiceModeHUD />
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <main className="flex-1 overflow-y-auto custom-scrollbar">
            {renderModule()}
        </main>
        <YusraVoiceOverlay />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <SecurityProvider>
    <AppContent />
  </SecurityProvider>
);

export default App;
