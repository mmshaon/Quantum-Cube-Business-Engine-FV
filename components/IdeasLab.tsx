import React, { useState } from 'react';
import { BusinessIdea, AIPrediction } from '../types';
import { mockIdeas } from '../services/mockData';
import { Icons } from '../constants';
import { predictIdeaSuccess } from '../services/geminiService';
import { useLanguage } from './LanguageContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

type TabType = 'analysis' | 'strategy' | 'budget' | 'roadmap';

const IdeasIncubator: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [ideas] = useState<BusinessIdea[]>(mockIdeas);
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(ideas[0] || null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('analysis');
  const [predictionResult, setPredictionResult] = useState<AIPrediction | null>(null);

  const handlePredict = async (idea: BusinessIdea) => {
    if (isPredicting) return;
    setIsPredicting(true);
    setPredictionResult(null);
    try {
      const result = await predictIdeaSuccess(idea);
      setPredictionResult(result);
    } finally {
      setIsPredicting(false);
    }
  };

  const renderTabContent = () => {
    if (!predictionResult && activeTab !== 'analysis') {
      return (
        <div className="flex flex-col items-center justify-center h-80 text-slate-600 animate-in fade-in duration-1000">
          <div className="liquid-bobbing relative flex items-center justify-center">
             <div className="liquid-spinner scale-[1.4] absolute" />
             <div className="quantum-orb scale-90 opacity-80" />
          </div>
          <div className="mt-16 flex flex-col items-center gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-400 mono-font animate-pulse">Synthesizing Stratagem Artifacts...</p>
            <div className="w-32 h-[1px] bg-blue-500/20" />
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'analysis':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-[1px] bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Problem Space</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium bg-white/5 p-8 rounded-3xl border border-white/5 shadow-inner">
                    {selectedIdea?.problem}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-[1px] bg-pink-500 shadow-[0_0_8px_#d946ef]" />
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Strategic Solution</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium bg-white/5 p-8 rounded-3xl border border-white/5 shadow-inner">
                    {selectedIdea?.solution}
                  </p>
                </div>
             </div>

             {predictionResult && (
                <div className="space-y-10">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      <div className="h-[420px] glass-panel electric-border rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-8 left-8 text-[10px] font-black text-blue-400 uppercase tracking-widest z-10 mono-font">Neural Metric Radar v2.0</div>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                            { subject: t('feasibility'), A: predictionResult.technicalFeasibility },
                            { subject: t('market_potential'), A: predictionResult.marketFit },
                            { subject: 'Complexity', A: 75 },
                            { subject: 'Risk Factor', A: predictionResult.score > 80 ? 25 : 60 },
                            { subject: 'Viability', A: predictionResult.financialViability },
                          ]}>
                            <PolarGrid stroke="#ffffff10" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                            <Radar name="Simulation" dataKey="A" stroke="#3b82f6" fill="url(#radar-grad)" fillOpacity={0.6} />
                            <defs>
                                <linearGradient id="radar-grad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="50%" stopColor="#d946ef" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {[
                           { label: 'Integrity', val: predictionResult.score, color: '#3b82f6' },
                           { label: 'Market Fit', val: predictionResult.marketFit, color: '#10b981' },
                           { label: 'Tech Sync', val: predictionResult.technicalFeasibility, color: '#06b6d4' },
                           { label: 'Fiscal ROI', val: predictionResult.financialViability, color: '#d946ef' }
                         ].map((stat, i) => (
                           <div key={i} className="glass-panel p-8 rounded-[2rem] flex flex-col justify-center transition-all hover:scale-105 active:scale-95 shadow-lg group overflow-hidden" style={{ borderColor: `${stat.color}30`, borderLeftWidth: '6px' }}>
                              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</span>
                              <span className="text-4xl font-black mono-font" style={{ color: stat.color }}>{stat.val}%</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-80 text-slate-600 animate-in fade-in duration-700">
             <div className="liquid-bobbing relative flex items-center justify-center">
                <div className="liquid-spinner scale-110" />
                <div className="quantum-orb scale-75 opacity-40" />
             </div>
             <p className="mt-14 text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 mono-font">Navigating Neural Data Currents...</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative text-white min-h-screen p-4 lg:p-10 select-none animate-in fade-in duration-1000 font-outfit ${isRtl ? 'text-right' : ''}`}>
      <header className={`flex flex-col lg:flex-row justify-between items-start mb-16 gap-8 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter heading-font bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-400 drop-shadow-2xl">
            {t('incubator_title')}
          </h1>
          <p className="text-sm font-medium text-slate-500 italic max-w-2xl leading-relaxed">"{t('market_dominance')}"</p>
        </div>
        <button className="glass-panel electric-border px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-600/30 transition-all touch-interactive bg-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.2)] active:scale-95">
          <Icons.Plus size={16} className="inline mr-2" />
          {t('infuse_btn')}
        </button>
      </header>

      <div className={`grid grid-cols-12 gap-10 h-[calc(100vh-320px)]`}>
        <div className="col-span-12 lg:col-span-3 overflow-y-auto custom-scrollbar pr-4 space-y-6">
          <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] mb-8">Incubation Stream</h4>
          {ideas.map((idea, idx) => (
            <div 
              key={idea.id}
              onClick={() => {
                if (!isPredicting) {
                    setSelectedIdea(idea);
                    setPredictionResult(null);
                    setActiveTab('analysis');
                }
              }}
              className={`glass-panel p-8 rounded-[2.5rem] cursor-pointer transition-all duration-700 group float-item
                ${selectedIdea?.id === idea.id ? 'bg-blue-600/20 border-blue-500/50 scale-[1.05] shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}
                ${isPredicting ? 'pointer-events-none opacity-30' : ''}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <h3 className="text-lg font-black text-white heading-font tracking-tight mb-4">{idea.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black mb-6 italic line-clamp-2">"{idea.tagline}"</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-5">
                <span className="mono-font text-[9px] text-slate-700 font-black uppercase">{idea.createdAt}</span>
                {idea.validationScore && (
                    <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                         <span className="text-[10px] font-black text-cyan-400 mono-font">{idea.validationScore}%</span>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-9 flex flex-col gap-8 h-full">
          {selectedIdea ? (
            <div className="glass-panel electric-border flex-1 rounded-[45px] p-12 flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-700 water-ripple">
               <div className="flex flex-col md:flex-row justify-between items-start mb-16 relative z-10 gap-10">
                  <div className="space-y-5">
                    <h2 className="text-6xl font-black text-white heading-font tracking-tighter drop-shadow-2xl">{selectedIdea.title}</h2>
                    <div className="flex items-center gap-6">
                        <span className="text-blue-400 font-black italic text-xs tracking-[0.3em] mono-font">SYNC: 0x{selectedIdea.id.toUpperCase()}</span>
                        <div className="h-2 w-2 bg-slate-800 rounded-full" />
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">{selectedIdea.market}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handlePredict(selectedIdea)}
                    disabled={isPredicting}
                    className={`group relative px-12 py-10 rounded-[2.5rem] glass-panel transition-all min-w-[280px] shadow-2xl active:scale-95
                      ${isPredicting ? 'bg-blue-600/40' : 'hover:scale-105 hover:bg-blue-600/25 border-blue-500/30'}`}
                  >
                    {isPredicting ? (
                      <div className="flex flex-col items-center gap-5">
                         <div className="liquid-bobbing relative flex items-center justify-center">
                            <div className="liquid-spinner w-12 h-12" />
                            <div className="quantum-orb scale-60" />
                         </div>
                         <span className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-400 animate-pulse">{t('analyzing')}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-5">
                        <Icons.BrainCircuit className="text-blue-500 group-hover:text-white transition-all duration-700 group-hover:scale-110" size={48} />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 group-hover:text-white transition-colors">Neural Predict</span>
                      </div>
                    )}
                  </button>
               </div>

               <nav className="flex gap-16 mb-16 border-b border-white/5 relative z-10 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'analysis', label: t('analysis_tab') },
                    { id: 'strategy', label: t('strategy_tab') },
                    { id: 'budget', label: t('budget_tab') },
                    { id: 'roadmap', label: t('roadmap_tab') }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`pb-6 text-[12px] font-black uppercase tracking-[0.5em] transition-all relative whitespace-nowrap
                        ${activeTab === tab.id ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-[-1px] left-0 w-full h-[4px] bg-gradient-to-r from-blue-400 via-cyan-400 to-pink-400 shadow-[0_0_25px_rgba(59,130,246,0.8)]" />
                      )}
                    </button>
                  ))}
               </nav>

               <div className="flex-1 overflow-y-auto custom-scrollbar pr-6 relative z-10 pb-12">
                  {renderTabContent()}
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-900 space-y-16 glass-panel rounded-[3rem] bg-void/40 backdrop-blur-sm">
                <div className="relative">
                  <span className="text-[12vw] opacity-10 font-black tracking-tighter uppercase drop-shadow-2xl italic">Neural Lab</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[14px] font-black uppercase tracking-[1.2em] text-slate-700 animate-pulse">Select Idea for Simulation</p>
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeasIncubator;