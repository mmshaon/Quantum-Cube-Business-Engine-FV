
import React, { useState } from 'react';
import { useSecurity } from './SecurityContext';
import { Icons } from '../constants';

const LoginScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, signup, authState, logout } = useSecurity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (authState === 'PENDING_APPROVAL') {
    return (
      <div className="fixed inset-0 z-[200] bg-[#02001a] flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>
        <div className="w-full max-w-lg glass-panel electric-border rounded-[4rem] p-16 relative z-10 text-center animate-in zoom-in-95 duration-700">
           <div className="liquid-bobbing mb-12 relative flex items-center justify-center mx-auto">
             <div className="liquid-spinner scale-[2] absolute" style={{ borderColor: '#f59e0b' }} />
             <div className="quantum-orb scale-125 shadow-[0_0_40px_rgba(245,158,11,0.4)]" style={{ background: 'radial-gradient(circle, #fff 0%, #f59e0b 40%, transparent 80%)' }} />
           </div>
           <h2 className="text-4xl font-black heading-font text-white uppercase tracking-tighter mb-4">Cortex Access Pending</h2>
           <p className="text-sm text-slate-500 leading-relaxed font-medium mb-10 max-w-sm mx-auto">
             Your neural profile has been uploaded to the Quantum Matrix. Access requires physical verification by a Level-10 Administrator.
           </p>
           <div className="flex flex-col gap-4">
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                 <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Protocol: Awaiting Signature</span>
              </div>
              <button onClick={logout} className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] hover:text-white transition-colors mt-4">
                Abort Uplink
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-void flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-pink-600/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="w-full max-w-md glass-panel electric-border rounded-[3rem] p-12 relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 mb-6 border border-white/10 group">
             <span className="font-black text-white text-3xl heading-font drop-shadow-lg -rotate-12">Q</span>
          </div>
          <h1 className="text-2xl font-black heading-font tracking-tighter text-white uppercase text-center leading-none">Quantum Core</h1>
          <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em] mt-2 mono-font">Security Subsystem Access</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black text-red-400 uppercase tracking-widest text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
              <input 
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-void/60 border border-white/5 rounded-2xl py-4 px-6 text-xs font-bold text-white uppercase focus:outline-none focus:border-blue-500/50 transition-all" 
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Neural ID (Email)</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-void/60 border border-white/5 rounded-2xl py-4 px-6 text-xs font-bold text-white uppercase focus:outline-none focus:border-blue-500/50 transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Cortex Bypass (Password)</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-void/60 border border-white/5 rounded-2xl py-4 px-6 text-xs font-bold text-white focus:outline-none focus:border-pink-500/50 transition-all" 
            />
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            {isLoading ? "Synchronizing..." : isLogin ? "Establish Session" : "Initiate Enrollment"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
           >
              {isLogin ? "No Access Profile? Create One" : "Already Enrolled? Secure Linkage"}
           </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
