import { useState, useEffect } from 'react';

export const useYusraVoice = (onResult) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser does not support Voice Recognition");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // বাংলা সাপোর্টের জন্য 'bn-BD' ও যোগ করা যাবে
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return { isListening, startListening };
};
