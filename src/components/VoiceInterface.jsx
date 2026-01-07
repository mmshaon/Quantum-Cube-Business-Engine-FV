import React from 'react';
import { Mic } from 'lucide-react';
import { useYusraVoice } from '../hooks/useYusraVoice';

const VoiceInterface = ({ isGodMode }) => {
  const { isListening, startListening } = useYusraVoice((text) => {
    console.log("Master Voice:", text);
  });

  return (
    <button 
      onClick={startListening}
      className={`relative p-6 rounded-full transition-all duration-500 ${
        isListening 
        ? 'bg-red-600 shadow-[0_0_50px_red]' 
        : isGodMode ? 'bg-red-500/20' : 'bg-[#00FFA3]/20'
      }`}
    >
      <Mic className={isListening ? "text-white" : (isGodMode ? "text-red-500" : "text-[#00FFA3]")} />
      {isListening && <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30" />}
    </button>
  );
};

export default VoiceInterface;
