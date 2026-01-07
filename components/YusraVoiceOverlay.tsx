
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from './LanguageContext';
import { useSecurity } from './SecurityContext';

const YusraVoiceOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const { language, t } = useLanguage();
  const { getYusraInstruction } = useSecurity();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'bn' ? 'bn-BD' : language === 'ar' ? 'ar-SA' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processWithAI(text);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [language]);

  const processWithAI = async (text: string) => {
    setIsSpeaking(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = await getYusraInstruction();
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: text,
        config: { systemInstruction }
      });
      const reply = result.text || "Neural core synced. Standing by.";
      setResponse(reply);
      speak(reply);
    } catch (e) {
      setResponse("Uplink failed. Please retry.");
      setIsSpeaking(false);
    }
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'bn' ? 'bn-BD' : language === 'ar' ? 'ar-SA' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-white/20 z-[100] hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
        <Icons.BrainCircuit size={32} className="text-white group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[110] bg-void/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl glass-panel electric-border rounded-[3rem] p-12 relative overflow-hidden animate-in zoom-in-95 duration-500">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <Icons.Plus className="rotate-45" size={24} />
            </button>

            <div className="flex flex-col items-center text-center space-y-10">
              <div className="relative flex items-center justify-center">
                 <div className={`w-32 h-32 rounded-full border-4 border-blue-500/30 flex items-center justify-center transition-all duration-700 ${isListening || isSpeaking ? 'scale-110 border-blue-400' : ''}`}>
                    <div className={`liquid-spinner scale-[2] absolute ${isListening ? 'opacity-100' : 'opacity-0'}`} />
                    <Icons.BrainCircuit size={56} className={`${isSpeaking ? 'animate-pulse text-pink-500' : 'text-blue-500'}`} />
                 </div>
                 {isSpeaking && (
                   <div className="absolute -bottom-4 flex gap-1 h-8">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1.5 bg-pink-500 rounded-full animate-pulse" style={{ height: `${40 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                   </div>
                 )}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black heading-font text-white uppercase tracking-tighter">Yusra Neural Sync</h3>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mono-font">Virtual CEO Core Active</p>
              </div>

              <div className="w-full bg-white/5 border border-white/5 rounded-3xl p-8 min-h-[200px] flex flex-col justify-center gap-6">
                {transcript && (
                  <div className="text-left">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Input Captured:</span>
                    <p className="text-lg font-bold text-white italic">"{transcript}"</p>
                  </div>
                )}
                {response && (
                  <div className="text-left animate-in slide-in-from-bottom-2 duration-500">
                    <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest block mb-2">Yusra Directive:</span>
                    <p className="text-base text-slate-300 leading-relaxed font-medium">"{response}"</p>
                  </div>
                )}
                {!transcript && !response && (
                  <p className="text-slate-600 font-bold uppercase tracking-[0.2em] italic">" Master, I am listening to your strategic commands... "</p>
                )}
              </div>

              <button 
                onClick={toggleListening}
                className={`px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] transition-all flex items-center gap-4
                  ${isListening ? 'bg-pink-600 shadow-[0_0_30px_rgba(236,72,153,0.4)] text-white' : 'bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] text-white'}`}
              >
                <Icons.Activity size={18} className={isListening ? 'animate-spin-slow' : ''} />
                {isListening ? 'Capturing Neural Flux' : 'Initialize Command Loop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YusraVoiceOverlay;
