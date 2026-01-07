
export enum ModuleType {
  DASHBOARD = 'dashboard',
  IDEAS = 'ideas',
  PLANNING = 'planning',
  FINANCE = 'finance',
  CRM = 'crm',
  HR = 'hr',
  PROJECTS = 'projects',
  INVENTORY = 'inventory',
  REPORTING = 'reporting',
  SALES = 'sales',
  SUPPLY_CHAIN = 'supply_chain',
  MARKETING = 'marketing',
  SUPPORT = 'support',
  LEGAL = 'legal',
  RD = 'rd',
  ASSETS = 'assets',
  IT = 'it',
  QUALITY = 'quality',
  PROCUREMENT = 'procurement',
  FLEET = 'fleet',
  RISK = 'risk',
  SETTINGS = 'settings',
  SCHEDULE = 'schedule',
  SECURITY = 'security',
  SUBMISSIONS = 'submissions',
  NOTIFICATIONS = 'notifications'
}

export type Language = 'en' | 'bn' | 'ar';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  status: 'active' | 'suspended';
  created_at: string;
  lastLoginAt?: string;
  role?: string;
  isOwner?: boolean;
}

export type ActorType = 'user' | 'virtual_ceo' | 'automation_bot';

export interface Actor {
  id: string;
  type: ActorType;
  linkedUserId?: string;
  system_name?: string; 
}

export interface Cube {
  id: string;
  name: string;
  branding: {
    logo_url?: string;
    primary_color: string;
    accent_color: string;
  };
  ownerUserId: string;
  created_at: string;
}

export interface Role {
  id: string;
  cubeId: string;
  name: string;
  description: string;
  allowed_actions: string[];
  denied_actions: string[];
}

export interface Policy {
  id: string;
  cubeId: string;
  type: 'rbac' | 'abac';
  description: string;
  condition: Record<string, any>;
  effect: 'allow' | 'deny';
  constraints?: Record<string, any>;
}

export interface DelegationRule {
  id: string;
  cubeId: string;
  delegatedFromUserId: string;
  delegateActorId: string;
  scope: string[];
  constraints: {
    max_amount?: number;
    projectIds?: string[];
    currency?: string;
  };
  valid_from: string;
  valid_until: string;
  status: 'active' | 'expired' | 'revoked';
}

export interface BusinessIdea {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  market: string;
  validationScore: number;
  status: string;
  createdAt: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
}

export interface BusinessPlan {
  id: string;
  ideaId: string;
  name: string;
  vision: string;
  mission: string;
  objectives: string[];
  status: string;
}

export interface AIPrediction {
  score: number;
  marketFit: number;
  technicalFeasibility: number;
  financialViability: number;
  riskLevel: string;
  insights: string[];
  recommendations: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  status: string;
  dueDate: string;
}

export interface Membership {
  id: string;
  cubeId: string;
  userId: string;
  roleId: string;
  status: 'active' | 'inactive';
}
