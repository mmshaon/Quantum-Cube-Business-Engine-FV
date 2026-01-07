import React from 'react';
import { ModuleType } from './types';
import { 
  ChevronRight, Plus, BrainCircuit, TrendingUp, AlertTriangle, 
  CheckCircle2, Clock, CheckSquare, FileText, Flag, Settings,
  Target, DollarSign, CalendarDays, Users, Briefcase, PieChart, ShieldCheck, Database,
  Box, Truck, BarChart3, Megaphone, LifeBuoy, Gavel, Microscope, HardDrive, 
  ShieldAlert, Activity, ShoppingCart, Forklift, Zap, Shield, Send, Bell, Camera
} from 'lucide-react';

const IconWrapper: React.FC<{ children: React.ReactNode; color?: string }> = ({ children }) => (
  <div className={`relative group transition-all duration-500`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all">
      <defs>
        <linearGradient id="grad-blue-purple" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
        <linearGradient id="grad-orange-red" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="grad-cyan-teal" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="grad-lime-green" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="grad-red-pink" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  </div>
);

const StyledIcons = {
  Dashboard: () => (
    <IconWrapper>
      <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H17V17H14V14ZM17 17H20V20H17V17Z" fill="url(#grad-blue-purple)" />
    </IconWrapper>
  ),
  Incubator: () => (
    <IconWrapper>
      <circle cx="12" cy="12" r="8" stroke="url(#grad-orange-red)" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="4" fill="url(#grad-orange-red)" />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="url(#grad-orange-red)" strokeWidth="2" strokeLinecap="round" />
    </IconWrapper>
  ),
  Strategy: () => (
    <IconWrapper>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="url(#grad-cyan-teal)" strokeWidth="2" />
      <path d="M12 7V12L15 15" stroke="url(#grad-cyan-teal)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="url(#grad-cyan-teal)" />
    </IconWrapper>
  ),
  Schedule: () => (
    <IconWrapper>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="url(#grad-lime-green)" strokeWidth="2" />
      <path d="M4 9H20M9 4V20" stroke="url(#grad-lime-green)" strokeWidth="1.5" />
    </IconWrapper>
  ),
  Finance: () => (
    <IconWrapper>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#grad-blue-purple)" strokeWidth="2" />
      <path d="M2 17L12 22L22 17" stroke="url(#grad-blue-purple)" strokeWidth="2" />
      <path d="M2 12L12 17L22 12" stroke="url(#grad-blue-purple)" strokeWidth="2" />
    </IconWrapper>
  ),
  CRM: () => (
    <IconWrapper>
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="url(#grad-cyan-teal)" strokeWidth="2" />
      <circle cx="9" cy="7" r="4" stroke="url(#grad-cyan-teal)" strokeWidth="2" />
      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2524 22.1614 16.5523C21.6184 15.8522 20.8581 15.3516 20 15.13" stroke="url(#grad-cyan-teal)" strokeWidth="2" />
      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="url(#grad-cyan-teal)" strokeWidth="2" />
    </IconWrapper>
  ),
  HR: () => (
    <IconWrapper>
      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="url(#grad-blue-purple)" strokeWidth="2" />
      <circle cx="8.5" cy="7" r="4" stroke="url(#grad-blue-purple)" strokeWidth="2" />
      <rect x="18" y="8" width="4" height="12" rx="1" fill="url(#grad-blue-purple)" />
    </IconWrapper>
  ),
  Projects: () => (
    <IconWrapper>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#grad-orange-red)" strokeWidth="2" />
      <path d="M3 9H21M9 21V9" stroke="url(#grad-orange-red)" strokeWidth="2" />
    </IconWrapper>
  ),
  Inventory: () => (
    <IconWrapper>
      <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="url(#grad-lime-green)" strokeWidth="2" />
      <path d="M3 8H21M9 3V8M15 3V8M8 21V16M16 21V16" stroke="url(#grad-lime-green)" strokeWidth="1.5" />
    </IconWrapper>
  ),
  Generic: ({ grad = "grad-blue-purple", icon: Icon }: { grad?: string, icon?: any }) => (
    <IconWrapper>
       <rect x="2" y="2" width="20" height="20" rx="4" fill={`url(#${grad})`} opacity="0.1" />
       <rect x="2" y="2" width="20" height="20" rx="4" stroke={`url(#${grad})`} strokeWidth="1" />
       {Icon && <Icon size={14} stroke={`url(#${grad})`} style={{ position: 'absolute', top: '5px', left: '5px' }} />}
    </IconWrapper>
  )
};

export const MODULES = [
  { id: ModuleType.DASHBOARD, label: 'Dashboard', icon: <StyledIcons.Dashboard /> },
  { id: ModuleType.SUBMISSIONS, label: 'Uplink Center', icon: <StyledIcons.Generic grad="grad-blue-purple" icon={Send} /> },
  { id: ModuleType.NOTIFICATIONS, label: 'Alerts', icon: <StyledIcons.Generic grad="grad-orange-red" icon={Bell} /> },
  { id: ModuleType.IDEAS, label: 'Ideas Incubator', icon: <StyledIcons.Incubator /> },
  { id: ModuleType.PLANNING, label: 'Strategy Room', icon: <StyledIcons.Strategy /> },
  { id: ModuleType.SCHEDULE, label: 'Schedule & Goals', icon: <StyledIcons.Schedule /> },
  { id: ModuleType.FINANCE, label: 'Financials', icon: <StyledIcons.Finance /> },
  { id: ModuleType.CRM, label: 'CRM Dynamics', icon: <StyledIcons.CRM /> },
  { id: ModuleType.HR, label: 'Human Resources', icon: <StyledIcons.HR /> },
  { id: ModuleType.PROJECTS, label: 'Project Desk', icon: <StyledIcons.Projects /> },
  { id: ModuleType.SALES, label: 'Sales Engine', icon: <StyledIcons.Generic grad="grad-orange-red" icon={TrendingUp} /> },
  { id: ModuleType.MARKETING, label: 'Marketing Hub', icon: <StyledIcons.Generic grad="grad-blue-purple" icon={Megaphone} /> },
  { id: ModuleType.INVENTORY, label: 'Inventory Matrix', icon: <StyledIcons.Inventory /> },
  { id: ModuleType.SETTINGS, label: 'System Kernel', icon: <StyledIcons.Generic grad="grad-blue-purple" icon={Settings} /> },
];

export const Icons = {
  ChevronRight, Plus, BrainCircuit, TrendingUp, AlertTriangle, 
  CheckCircle2, Clock, CheckSquare, FileText, Flag, Settings,
  Target, DollarSign, CalendarDays, CRM: Users, HR: Briefcase,
  Finance: PieChart, ShieldCheck, Database, Box, Truck, BarChart3, Megaphone, Briefcase, Shield,
  Users, Send, Bell, Camera, Activity, 
  // Fix: Adding ShieldAlert to the Icons export object as it is used in AdminPanel.tsx
  ShieldAlert
};