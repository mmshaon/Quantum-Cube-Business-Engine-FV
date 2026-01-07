
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, ResponsiveContainer, Cell, 
  AreaChart, Area, Tooltip, XAxis, PieChart, Pie
} from 'recharts';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { useSecurity } from './SecurityContext';
import { Icons, MODULES } from '../constants';

const QUANTUM_PALETTE = [
  '#3b82f6', '#d946ef', '#06b6d4', '#a3e635', '#f59e0b', 
  '#ef4444', '#10b981', '#6366f1', '#f472b6', '#2dd4bf',
  '#fbbf24', '#8b5cf6', '#0ea5e9', '#f43f5e', '#14b8a6'
];

const NeuralWaveform = ({ active = false, height = 120 }: { active?: boolean, height?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const h = canvas.height;
      
      const drawWave = (amplitude: number, frequency: number, color: string, speed: number) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = active ? 4 : 2;
        ctx.shadowBlur = active ? 20 : 10;
        ctx.shadowColor = color;
        
        for (let x = 0; x < width; x++) {
          const mult = active ? 1.5 : 1;
          const y = h / 2 + Math.sin(x * frequency + offset * speed) * (amplitude * mult);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      const c1 = theme === 'cyberpunk' ? '#00f3ff' : theme === 'arctic' ? '#0ea5e9' : '#3b82f6';
      const c2 = theme === 'cyberpunk' ? '#ff00ff' : theme === 'arctic' ? '#94a3b8' : '#d946ef';
      const c3 = theme === 'cyberpunk' ? '#f0ff00' : theme === 'arctic' ? '#7dd3fc' : '#06b6d4';

      drawWave(25, 0.02, c1, 0.05);
      drawWave(15, 0.03, c2, -0.07);
      drawWave(10, 0.05, c3, 0.1);
      
      offset += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [active, theme]);

  return <canvas ref={canvasRef} width="600" height={height} className="w-full h-full opacity-80" />;
};

const CarMeter = ({ value, label, colorStops = ['#10b981', '#f59e0b', '#ef4444'] }: any) => {
  const angle = (value / 100) * 180 - 180;
  return (
    <div className="relative flex flex-col items-center group">
      <svg width="140" height="80" viewBox="0 0 120 70">
        <defs>
          <linearGradient id={`gauge-grad-${label.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStops[0]} />
            <stop offset="50%" stopColor={colorStops[1]} />
            <stop offset="100%" stopColor={colorStops[2]} />
          </linearGradient>
        </defs>
        <path d="M10 60 A 50 50 0 0 1 110 60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
        <path d="M10 60 A 50 50 0 0 1 110 60" fill="none" stroke={`url(#gauge-grad-${label.replace(/\s/g, '')})`} strokeWidth="8" strokeLinecap="round" 
              strokeDasharray="157" strokeDashoffset={157 * (1 - value/100)} className="transition-all duration-1000 ease-out" />
        <line x1="60" y1="60" x2="15" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="text-white theme-arctic:text-slate-800 transition-all duration-1000 ease-out"
              style={{ transform: `rotate(${angle + 180}deg)`, transformOrigin: '60px 60px' }} />
      </svg>
      <div className="absolute bottom-0 text-center">
        <span className="text-xl font-black mono-font text-white theme-arctic:text-slate-900">{value}%</span>
        <div className="text-[8px] font-black uppercase text-slate-500 tracking-[0.2em]">{label}</div>
      </div>
    </div>
  );
};

const CRMDynamicsFeed = () => {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const int = setInterval(() => setPulse(p => p + 1), 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="col-span-12 glass-panel electric-border p-8 rounded-[3rem] min-h-[400px] flex flex-col relative overflow-hidden group">
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
            <Icons.CRM size={24} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white theme-arctic:text-slate-800">CRM Dynamics Spectral Flux</h3>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Live Customer Interaction Node</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center">
            <span className="text-[8px] font-black text-slate-500 uppercase">Retention</span>
            <span className="text-sm font-black text-emerald-400 mono-font">94.2%</span>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center">
            <span className="text-[8px] font-black text-slate-500 uppercase">Acquisition</span>
            <span className="text-sm font-black text-blue-400 mono-font">+$12.4k</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="url(#crm-grad)" strokeWidth="12" strokeDasharray="440" strokeDashoffset={440 * 0.2} strokeLinecap="round" className="transition-all duration-1000" />
              <defs>
                <linearGradient id="crm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white mono-font">82%</span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Health</span>
            </div>
          </div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Saturation</h4>
        </div>

        <div className="flex flex-col justify-center gap-6">
          {[
            { label: 'Identified', count: 1240, color: 'bg-blue-500', width: '90%' },
            { label: 'Qualified', count: 842, color: 'bg-cyan-500', width: '65%' },
            { label: 'Engaged', count: 421, color: 'bg-pink-500', width: '35%' },
            { label: 'Converted', count: 184, color: 'bg-emerald-500', width: '15%' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                <span>{item.label}</span>
                <span className="mono-font text-white">{item.count}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full rounded-full transition-all duration-1000 ${item.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`} style={{ width: item.width }} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
           <div className="flex gap-4 items-end h-32">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div 
                  key={i} 
                  className="w-4 rounded-t-lg transition-all duration-500 ease-in-out" 
                  style={{ 
                    height: `${40 + Math.sin((pulse + i) * 0.8) * 30}%`, 
                    background: `linear-gradient(to top, transparent, ${i > 4 ? '#10b981' : '#3b82f6'})`,
                    opacity: 0.4 + (i/10)
                  }} 
                />
              ))}
           </div>
           <div className="text-center">
              <div className="text-xl font-black text-emerald-400 mono-font mb-1">POSITIVE</div>
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Customer Sentiment Flux</div>
           </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

const ModuleVisualization = ({ index, color, value }: { index: number, color: string, value: number }) => {
  const [data] = useState(Array.from({ length: 10 }, () => ({ val: Math.random() * 100 })));
  
  if (index % 4 === 0) {
    return (
      <div className="h-6 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area type="monotone" dataKey="val" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (index % 4 === 1) {
    return (
      <div className="flex gap-1 items-end h-6 w-full">
        {data.slice(0, 6).map((d, i) => (
          <div key={i} className="flex-1 rounded-t-[1px]" style={{ height: `${d.val}%`, backgroundColor: color, opacity: 0.6 }} />
        ))}
      </div>
    );
  } else if (index % 4 === 2) {
    return (
      <div className="flex items-center gap-1.5 h-6">
        <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        <div className="w-1.5 h-1.5 rounded-full opacity-40" style={{ backgroundColor: color }} />
        <span className="text-[9px] font-black mono-font" style={{ color }}>SYNCED</span>
      </div>
    );
  } else {
    return (
      <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[marquee_2s_linear_infinite]" />
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    );
  }
};

const Dashboard: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { dbStatus } = useSecurity();
  const [tick, setTick] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayMode, setOverlayMode] = useState<'chat' | 'voice'>('chat');
  const [liveData, setLiveData] = useState(Array.from({ length: 15 }, (_, i) => ({
    name: i,
    val: Math.floor(Math.random() * 80) + 20,
    val2: Math.floor(Math.random() * 60) + 10,
  })));

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => [...prev.slice(1), { 
          name: prev.length, 
          val: Math.floor(Math.random() * 80) + 20,
          val2: Math.floor(Math.random() * 60) + 10 
      }]);
      setTick(t => t + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative min-h-screen p-4 lg:p-10 select-none animate-in fade-in duration-1000 ${isRtl ? 'text-right' : ''}`}>
      
      <header className={`flex flex-col lg:flex-row justify-between items-end mb-12 gap-8 relative z-10 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
        <div className="space-y-2">
          <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <h1 className="text-4xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-cyan-300 drop-shadow-2xl uppercase theme-arctic:from-slate-800 theme-arctic:via-blue-600 theme-arctic:to-cyan-600">
              {t('portal_title' as any)}
            </h1>
            <div className={`h-2 w-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${dbStatus === 'connected' ? 'text-emerald-500 bg-emerald-500' : 'text-red-500 bg-red-500'}`} />
          </div>
          <p className="text-xs font-bold text-blue-400/70 tracking-[0.3em] uppercase mono-font">
            {t('portal_subtitle' as any)}
          </p>
        </div>

        <div className={`flex items-center gap-8 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
           <div className={isRtl ? 'text-left' : 'text-right'}>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Neon Nexus</div>
              <div className={`text-2xl font-black mono-font ${dbStatus === 'connected' ? 'text-emerald-400' : 'text-red-400'}`}>
                {dbStatus === 'connected' ? 'SYNCED' : 'OFFLINE'}
              </div>
           </div>
           <div className="w-[1px] h-10 bg-white/10" />
           <div className={isRtl ? 'text-left' : 'text-right'}>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Modules</div>
              <div className="text-2xl font-black text-cyan-400 mono-font">23/23</div>
           </div>
        </div>
      </header>

      {/* Strategic Hub Row */}
      <div className="grid grid-cols-12 gap-6 mb-10 relative z-10">
        <div className="col-span-12 lg:col-span-7 glass-panel electric-border p-8 rounded-[2.5rem] min-h-[380px] flex flex-col group overflow-hidden relative water-ripple">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <Icons.BrainCircuit size={120} />
          </div>
          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                   <Icons.BrainCircuit size={20} className="text-blue-400" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white theme-arctic:text-slate-800">Neural Strategy Terminal</h3>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[8px] font-black mono-font text-emerald-400 uppercase border border-emerald-500/30 px-3 py-1 rounded">Live Sync</span>
             </div>
          </div>

          <div className="flex-1 space-y-6 mb-8 overflow-y-auto custom-scrollbar pr-4 h-48">
             <div className="flex flex-col gap-2 max-w-[80%] animate-in fade-in slide-in-from-left duration-500">
                <div className="bg-white/5 border-l-2 border-blue-500 p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed text-slate-300 theme-arctic:text-slate-600">
                   Master, market simulations for the <span className="text-blue-400 font-bold italic">Quantum Ledger</span> expansion are complete. Success probability increased to 92.4% following APAC re-routing via Neon Node.
                </div>
             </div>
          </div>

          <div className="relative group/input">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl opacity-10 group-focus-within/input:opacity-30 transition-opacity blur" />
             <div className="relative flex items-center bg-void/60 border border-white/10 rounded-2xl overflow-hidden">
                <input type="text" placeholder="Quantum Strategic Directive..." className="w-full bg-transparent py-5 px-6 text-xs font-bold text-white uppercase tracking-widest focus:outline-none placeholder:text-slate-800" />
                <button className="px-6 text-blue-500 hover:text-white transition-colors">
                   <Icons.ChevronRight size={20} />
                </button>
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 glass-panel electric-border p-8 rounded-[2.5rem] flex flex-col justify-between group overflow-hidden holographic-flicker">
           <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Audio Temporal Hub</h3>
              <div className="flex gap-1.5 h-6">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-1 bg-pink-500/50 rounded-full animate-pulse" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }} />
                 ))}
              </div>
           </div>

           <div className="bg-void/40 rounded-[2rem] p-8 border border-white/5 my-8 flex items-center justify-center relative min-h-[160px] overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 blur-[50px] rounded-full animate-pulse" />
              <NeuralWaveform height={80} />
           </div>

           <div className="grid grid-cols-3 gap-4">
              {[
                { l: 'Isolation', v: '98%', c: 'text-emerald-400' },
                { l: 'Sampling', v: '96k', c: 'text-blue-400' },
                { l: 'Sync', v: '0.4ms', c: 'text-pink-400' }
              ].map((s, i) => (
                <div key={i} className="text-center p-3 bg-white/2 rounded-2xl border border-white/5 group-hover:bg-white/5 transition-all">
                   <div className="text-[7px] text-slate-500 font-black uppercase tracking-widest mb-1">{s.l}</div>
                   <div className={`text-[10px] font-black mono-font ${s.c}`}>{s.v}</div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* CRM Dynamics Section */}
      <div className="grid grid-cols-12 gap-6 mb-10 relative z-10">
        <CRMDynamicsFeed />
      </div>

      {/* Analytics Layer */}
      <div className="grid grid-cols-12 gap-6 mb-10 relative z-10">
        <div className="col-span-12 lg:col-span-4 glass-panel electric-border p-8 rounded-3xl min-h-[340px] flex flex-col group float-item">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Fiscal Core Flux</h3>
            <Icons.DollarSign size={16} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liveData}>
                <defs>
                   <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="url(#areaGrad)" strokeWidth={4} />
                <Tooltip content={() => null} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 glass-panel electric-border p-8 rounded-3xl min-h-[340px] flex flex-col group float-item" style={{ animationDelay: '1s' }}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400">Growth Spectrum</h3>
            <Icons.TrendingUp size={16} className="text-cyan-500" />
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={liveData.slice(-10)}>
                <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                  {liveData.slice(-10).map((_, i) => (
                    <Cell key={i} fill={QUANTUM_PALETTE[i % QUANTUM_PALETTE.length]} fillOpacity={0.8} />
                  ))}
                </Bar>
                <Tooltip content={() => null} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 glass-panel electric-border p-8 rounded-3xl min-h-[340px] flex flex-col items-center justify-center float-item" style={{ animationDelay: '2s' }}>
           <div className="w-full flex justify-between items-center mb-12">
              <h3 className="text-xs font-black uppercase tracking-widest text-orange-400">Neural Risk Cluster</h3>
              <Icons.AlertTriangle size={16} className="text-orange-500" />
           </div>
           <div className="flex-1 flex items-center justify-center">
              <CarMeter value={28 + (tick % 10)} label="Risk Exposure Index" />
           </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
