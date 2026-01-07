
import React, { useState, useRef, useEffect } from 'react';
import { useSecurity } from './SecurityContext';
import { Icons } from '../constants';
import { GoogleGenAI } from "@google/genai";

const Submissions: React.FC = () => {
  const { submitForm, currentUser, getNotifications } = useSecurity();
  const [formType, setFormType] = useState<'task_report' | 'demand' | 'expense' | null>(null);
  const [items, setItems] = useState<any[]>([{ id: Date.now(), title: '', description: '', amount: '' }]);
  const [media, setMedia] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [yusraHint, setYusraHint] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const alerts = await getNotifications();
      setRecentAlerts(alerts.slice(0, 3));
    };
    load();
  }, [isSuccess]);

  const addItem = () => setItems([...items, { id: Date.now(), title: '', description: '', amount: '' }]);
  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(it => it.id === id ? { ...it, [field]: value } : it));
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMedia(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const askYusra = async () => {
    setIsAnalyzing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const prompt = `As Yusra, the Virtual CEO, review this ${formType} submission. 
      Items: ${JSON.stringify(items)}. Give a 20-word strategic feedback or tip.`;
      const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: prompt });
      setYusraHint(response.text || "Standard alignment confirmed.");
    } catch (e) { setYusraHint("Neural link weak. Manual submission recommended."); }
    finally { setIsAnalyzing(false); }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm(formType!, items, media);
      setIsSuccess(true);
    } finally { setIsSubmitting(false); }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center animate-in zoom-in-95 duration-700">
         <div className="w-32 h-32 bg-emerald-500/20 rounded-full flex items-center justify-center mb-10 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <Icons.CheckCircle2 size={56} className="text-emerald-500 animate-bounce" />
         </div>
         <h2 className="text-5xl font-black heading-font text-white uppercase tracking-tighter mb-4">Neural Uplink Lock</h2>
         <p className="text-slate-500 text-sm max-w-sm font-medium leading-relaxed">
           Transmission finalized. Data is now encrypted and immutable. Monitor the <span className="text-blue-400">Alert Stream</span> for Kernel Admin review.
         </p>
         
         <div className="mt-12 w-full max-w-md space-y-4">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Recent Protocol Updates</h4>
            {recentAlerts.map((alert, i) => (
               <div key={i} className="glass-panel p-4 rounded-2xl border border-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-widest text-left">
                  {alert.message}
               </div>
            ))}
         </div>

         <button onClick={() => { setIsSuccess(false); setFormType(null); }} className="mt-16 px-12 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-white transition-all">
           Return to Node Nexus
         </button>
      </div>
    );
  }

  if (!formType) {
    return (
      <div className="p-10 max-w-6xl mx-auto space-y-16 animate-in fade-in duration-1000">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <Icons.Send size={24} className="text-blue-400" />
             </div>
             <h1 className="text-6xl font-black heading-font text-white uppercase tracking-tighter">Operational Uplink</h1>
          </div>
          <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em] ml-2">Secure Terminal Access // Node: {currentUser?.name}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { id: 'task_report', label: 'Tactical Task', icon: Icons.CheckSquare, color: 'from-blue-600 to-indigo-700', desc: 'Sync project milestones and daily intelligence.' },
             { id: 'demand', label: 'Asset Demand', icon: Icons.Box, color: 'from-cyan-500 to-blue-600', desc: 'Request operational resources or equipment.' },
             { id: 'expense', label: 'Fiscal Voucher', icon: Icons.DollarSign, color: 'from-pink-600 to-rose-700', desc: 'Submit expenditures for matrix audit.' }
           ].map((type) => (
              <button 
                key={type.id}
                onClick={() => setFormType(type.id as any)}
                className="group relative p-12 glass-panel electric-border rounded-[3.5rem] text-left hover:scale-105 transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <type.icon size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white heading-font uppercase mb-4">{type.label}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{type.desc}</p>
              </button>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10 animate-in slide-in-from-bottom-10 duration-700 pb-32">
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
         <button onClick={() => setFormType(null)} className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-white transition-colors">
           ← Cancel Session
         </button>
         <div className="text-right">
            <h2 className="text-4xl font-black text-white heading-font uppercase tracking-tighter">{formType.replace('_', ' ')}</h2>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mt-2 italic">Standard Template v2.4.0</p>
         </div>
      </div>

      <div className="space-y-8">
         {items.map((item, idx) => (
            <div key={item.id} className="glass-panel p-10 rounded-[3rem] flex flex-col md:flex-row gap-8 items-start relative group">
               <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-[12px] font-black mono-font text-slate-500 shrink-0 border border-white/5 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all">
                  0{idx + 1}
               </div>
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Designation</label>
                     <input 
                       placeholder="Item Title..."
                       value={item.title} onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                       className="w-full bg-void/60 border border-white/5 rounded-2xl p-5 text-[11px] font-black text-white uppercase focus:border-blue-500 transition-all outline-none"
                     />
                  </div>
                  {formType === 'expense' && (
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Fiscal Amount ($)</label>
                       <input 
                         placeholder="0.00"
                         value={item.amount} onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
                         className="w-full bg-void/60 border border-white/5 rounded-2xl p-5 text-[11px] font-black text-pink-400 mono-font focus:border-pink-500 transition-all outline-none"
                       />
                    </div>
                  )}
                  <div className="space-y-2 col-span-full">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Operational Summary</label>
                     <textarea 
                       placeholder="Detailed intelligence report..."
                       value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                       className="w-full bg-void/60 border border-white/5 rounded-2xl p-6 text-[11px] font-medium text-slate-300 min-h-[120px] focus:border-blue-500 transition-all outline-none resize-none"
                     />
                  </div>
               </div>
            </div>
         ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         <button onClick={addItem} className="flex-1 py-6 border-2 border-dashed border-white/10 rounded-[2.5rem] text-[11px] font-black uppercase text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all flex items-center justify-center gap-4 group">
            <Icons.Plus size={18} className="group-hover:scale-125 transition-transform" /> Add Predefined Field
         </button>
         
         <div className="flex-1 flex gap-6">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center transition-all relative overflow-hidden
                ${media ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 hover:bg-white/10'}`}
            >
               {media ? ( <img src={media} className="absolute inset-0 w-full h-full object-cover opacity-30" /> ) : null}
               <Icons.Camera size={24} className={media ? 'text-emerald-400' : 'text-slate-400'} />
               <span className={`text-[9px] font-black uppercase mt-3 tracking-widest ${media ? 'text-emerald-400' : 'text-slate-500'}`}>
                 {media ? 'Visual Sync Active' : 'Evidence Capture'}
               </span>
               <input type="file" accept="image/*" capture="environment" ref={fileInputRef} hidden onChange={handleCapture} />
            </button>
            <button 
              onClick={askYusra}
              disabled={isAnalyzing}
              className="flex-1 glass-panel electric-border rounded-[2.5rem] flex flex-col items-center justify-center hover:bg-blue-600/10 transition-all group"
            >
               <Icons.BrainCircuit size={24} className={isAnalyzing ? 'animate-pulse text-cyan-400' : 'text-blue-500 group-hover:scale-110 transition-transform'} />
               <span className="text-[9px] font-black uppercase mt-3 tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">Neural Consult</span>
            </button>
         </div>
      </div>

      {yusraHint && (
        <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[3rem] flex items-center gap-8 animate-in slide-in-from-left duration-500">
           <div className="w-14 h-14 bg-blue-500 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
             <Icons.BrainCircuit size={28} className="text-white" />
           </div>
           <div>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Yusra Intelligence Flux</span>
              <p className="text-sm font-medium text-slate-300 italic mt-1 leading-relaxed">"{yusraHint}"</p>
           </div>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] shadow-[0_0_60px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-6 group"
      >
         {isSubmitting ? (
           <div className="liquid-spinner scale-90" />
         ) : (
           <>
             <span className="text-sm font-black uppercase tracking-[0.6em] text-white">Execute Neural Uplink</span>
             <Icons.Send size={22} className="text-white group-hover:translate-x-4 transition-transform duration-500" />
           </>
         )}
      </button>
    </div>
  );
};

export default Submissions;
