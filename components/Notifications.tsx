
import React, { useState, useEffect } from 'react';
import { useSecurity } from './SecurityContext';
import { Icons } from '../constants';

const Notifications: React.FC = () => {
  const { getNotifications } = useSecurity();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getNotifications();
      setAlerts(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-5xl font-black heading-font text-white uppercase tracking-tighter">Alert Stream</h1>
        <p className="text-xs font-black text-blue-400 uppercase tracking-[0.4em] mt-2">Synchronizing Tactical Feed</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
           <div className="liquid-spinner" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="glass-panel p-20 rounded-[3rem] text-center opacity-40">
           <Icons.Bell size={48} className="mx-auto mb-6" />
           <p className="text-[10px] font-black uppercase tracking-widest">Zero Alerts in Buffer</p>
        </div>
      ) : (
        <div className="space-y-4">
           {alerts.map((alert) => (
              <div key={alert.id} className="glass-panel p-8 rounded-[2rem] flex items-start gap-6 hover:bg-white/5 transition-all group">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border
                    ${alert.message.includes('approved') ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-pink-500/10 border-pink-500/30 text-pink-400'}`}>
                    <Icons.Bell size={20} />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200 leading-relaxed mb-2">{alert.message}</p>
                    <span className="text-[8px] font-black text-slate-600 uppercase mono-font">{new Date(alert.created_at).toLocaleString()}</span>
                 </div>
              </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
