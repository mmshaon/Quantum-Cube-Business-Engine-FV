
import { BusinessIdea, Metric, BusinessPlan } from '../types';

export const mockMetrics: Metric[] = [
  { label: 'Total Revenue', value: '$2,450,000', change: 12.5, trend: 'up' },
  { label: 'Active Projects', value: 24, change: 5, trend: 'up' },
  { label: 'Customer Growth', value: '18%', change: -2.4, trend: 'down' },
  { label: 'Employee Satisfaction', value: '4.8/5', change: 0.2, trend: 'up' },
];

export const mockIdeas: BusinessIdea[] = [
  {
    id: 'idea-1',
    title: 'Quantum Ledger',
    tagline: 'Hyper-secure blockchain for supply chain transparency.',
    problem: 'Fragmentation and fraud in global logistics tracking.',
    solution: 'A decentralized ledger powered by post-quantum encryption.',
    market: 'Logistics, Pharma, High-end retail.',
    validationScore: 88,
    status: 'validated',
    createdAt: '2024-03-01'
  },
  {
    id: 'idea-2',
    title: 'Eco-Sync AI',
    tagline: 'Autonomous energy grid optimization for smart cities.',
    problem: 'Energy waste in urban environments due to inefficient routing.',
    solution: 'Real-time AI monitoring and rerouting of surplus clean energy.',
    market: 'Municipal governments, Utility providers.',
    validationScore: 72,
    status: 'planning',
    createdAt: '2024-03-15'
  }
];

export const mockPlans: BusinessPlan[] = [
  {
    id: 'plan-1',
    ideaId: 'idea-1',
    name: 'Quantum Ledger Phase 1',
    vision: 'Set the global standard for logistics security.',
    mission: 'Empower transparency through quantum-safe technology.',
    objectives: ['Acquire 5 anchor clients', 'Launch Beta in Q3', 'Secure $2M seed funding'],
    status: 'active'
  }
];
