
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Cube, Role, Policy, DelegationRule } from '../types';
import { db } from '../services/neonService';

export type AuthState = 'SIGNED_OUT' | 'PENDING_APPROVAL' | 'AUTHORIZED';

const MASTER_EMAIL = 'shaoncmd@gmail.com';
const MASTER_PASS = 'BadSoul@1989';

interface SecurityContextType {
  currentUser: User | null;
  authState: AuthState;
  dbStatus: 'connecting' | 'connected' | 'error';
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  adminApproveUser: (userId: string, role: string) => Promise<void>;
  getPendingUsers: () => Promise<any[]>;
  getAllUsers: () => Promise<any[]>;
  submitForm: (type: string, content: any, media: string | null) => Promise<void>;
  getNotifications: () => Promise<any[]>;
  getAllSubmissions: () => Promise<any[]>;
  reviewSubmission: (id: number, status: 'approved' | 'rejected', feedback: string) => Promise<void>;
  updateYusraTraining: (instruction: string) => Promise<void>;
  getYusraInstruction: () => Promise<string>;
  systemBackup: () => Promise<void>;
  systemRestore: () => Promise<void>;
  resetAdminSystem: () => Promise<void>; // Master Key only
  roles: Role[];
  policies: Policy[];
  delegations: DelegationRule[];
  currentCube: Cube | null;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>('SIGNED_OUT');
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [yusraInstruction, setYusraInstruction] = useState('You are Yusra, the Virtual CEO. Provide strategic, concise, and market-focused directives.');

  const [roles] = useState<Role[]>([
    { id: 'kernel-adm', cubeId: 'q-core', name: 'Kernel Admin', description: 'Ultimate system authority.', allowed_actions: ['all'], denied_actions: [] },
  ]);
  const [policies] = useState<Policy[]>([]);
  const [delegations] = useState<DelegationRule[]>([]);
  const [currentCube] = useState<Cube | null>({ id: 'q-core', name: 'Quantum Core', branding: { primary_color: '#3b82f6', accent_color: '#d946ef' }, ownerUserId: 'root', created_at: new Date().toISOString() });

  useEffect(() => {
    const initDb = async () => {
      try {
        const isConnected = await db.checkConnection();
        if (isConnected) {
          await db.bootstrapDatabase();
          setDbStatus('connected');
        } else {
          setDbStatus('error');
        }
      } catch (err) {
        console.error("DB Init Fail:", err);
        setDbStatus('error');
      }
    };
    initDb();
  }, []);

  const login = async (email: string, pass: string) => {
    // MASTER KEY BYPASS PROTOCOL
    if (email === MASTER_EMAIL && pass === MASTER_PASS) {
      const ownerUser: User = {
        id: 'master-root',
        email: MASTER_EMAIL,
        name: 'System Architect',
        status: 'active',
        created_at: new Date().toISOString(),
        role: 'admin',
        isOwner: true
      };
      setCurrentUser(ownerUser);
      setAuthState('AUTHORIZED');
      return;
    }

    if (dbStatus !== 'connected') throw new Error("Database offline - Access restricted to Master Key.");
    
    const users = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pass]);
    
    if (!users || users.length === 0) {
      throw new Error("Invalid credentials or user not found.");
    }
    
    const user = users[0];
    
    // Normalize DB boolean/role checks
    const isAdmin = user.role === 'admin' || user.role === 'ceo';
    const isApproved = String(user.is_approved) === 'true' || user.is_approved === true;

    setCurrentUser({ 
      id: user.id, 
      email: user.email, 
      name: user.name || 'Anonymous Node', 
      status: user.status || 'active', 
      created_at: user.created_at, 
      role: user.role,
      isOwner: false
    });

    if (isAdmin || isApproved) {
      setAuthState('AUTHORIZED');
    } else {
      setAuthState('PENDING_APPROVAL');
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    if (dbStatus !== 'connected') throw new Error("Database not ready. Please wait for connectivity.");
    
    const userId = `u_${Math.random().toString(36).substr(2, 9)}`;
    
    // Check if this is the first user
    const countRes = await db.query('SELECT COUNT(*) as count FROM users');
    const userCount = parseInt(countRes[0]?.count || '0', 10);
    
    // First user is always admin and approved
    const isFirst = userCount === 0;
    const role = isFirst ? 'admin' : 'user';
    const approved = isFirst ? true : false;

    try {
      await db.query(
        'INSERT INTO users (id, name, email, password, role, is_approved) VALUES ($1, $2, $3, $4, $5, $6)', 
        [userId, name, email, pass, role, approved]
      );
      // Wait for a small delay to ensure DB propagation
      await new Promise(resolve => setTimeout(resolve, 500));
      await login(email, pass);
    } catch (err: any) {
      if (err.message?.includes('unique constraint')) {
        throw new Error("This Neural ID is already registered in the matrix.");
      }
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthState('SIGNED_OUT');
  };

  const resetAdminSystem = async () => {
    if (!currentUser?.isOwner) return;
    await db.query("UPDATE users SET role = 'admin', is_approved = TRUE WHERE role = 'ceo' OR role = 'user'");
    await db.query(`INSERT INTO audit_logs (actor_id, action, metadata) VALUES ($1, $2, $3)`, 
      [currentUser?.id, 'system.emergency_reset', JSON.stringify({ note: 'Permissions restored via Master Override' })]);
  };

  const submitForm = async (type: string, content: any, media: string | null) => {
    if (!currentUser) return;
    await db.query('INSERT INTO submissions (user_id, type, content, media_data) VALUES ($1, $2, $3, $4)', 
      [currentUser.id, type, JSON.stringify(content), media]);
  };

  const getNotifications = async () => {
    if (!currentUser) return [];
    return await db.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [currentUser.id]);
  };

  const getAllSubmissions = async () => {
    return await db.query('SELECT s.*, u.name as user_name FROM submissions s LEFT JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC');
  };

  const getAllUsers = async () => {
    return await db.query('SELECT id, name, email, role, is_approved, status FROM users ORDER BY created_at DESC');
  };

  const reviewSubmission = async (id: number, status: 'approved' | 'rejected', feedback: string) => {
    const res = await db.query('UPDATE submissions SET status = $1, admin_feedback = $2 WHERE id = $3 RETURNING user_id, type', [status, feedback, id]);
    if (res && res.length > 0) {
      const { user_id, type } = res[0];
      const msg = `Your ${type.replace('_', ' ')} has been ${status}. Feedback: ${feedback}`;
      await db.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2)', [user_id, msg]);
    }
  };

  const adminApproveUser = async (userId: string, role: string) => {
    await db.query('UPDATE users SET is_approved = TRUE, role = $1 WHERE id = $2', [role, userId]);
  };

  const getPendingUsers = async () => {
    return await db.query('SELECT id, name, email, role, created_at FROM users WHERE is_approved = FALSE');
  };

  const updateYusraTraining = async (instr: string) => { setYusraInstruction(instr); };
  const getYusraInstruction = async () => yusraInstruction;

  const systemBackup = async () => {
    await db.query(`INSERT INTO audit_logs (actor_id, action, metadata) VALUES ($1, $2, $3)`, 
      [currentUser?.id, 'system.backup', JSON.stringify({ ts: new Date().toISOString() })]);
  };

  const systemRestore = async () => {
    await db.query(`INSERT INTO audit_logs (actor_id, action, metadata) VALUES ($1, $2, $3)`, 
      [currentUser?.id, 'system.restore', JSON.stringify({ ts: new Date().toISOString() })]);
  };

  return (
    <SecurityContext.Provider value={{ 
      currentUser, authState, dbStatus, login, signup, logout, adminApproveUser, getPendingUsers, getAllUsers,
      submitForm, getNotifications, getAllSubmissions, reviewSubmission, updateYusraTraining, getYusraInstruction,
      systemBackup, systemRestore, resetAdminSystem, roles, policies, delegations, currentCube 
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity must be used within SecurityProvider');
  return context;
};
