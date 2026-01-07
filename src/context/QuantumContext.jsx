import React, { createContext, useContext, useState } from 'react';

const QuantumContext = createContext();

export const QuantumProvider = ({ children }) => {
  const [isGodMode, setIsGodMode] = useState(false);
  const [activeModule, setActiveModule] = useState("1.0");
  const [systemLogs, setSystemLogs] = useState(["[INIT] Quantum Engine Started", "[OK] Yusra Logic Merged"]);

  const logAction = (msg) => setSystemLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);

  return (
    <QuantumContext.Provider value={{ isGodMode, setIsGodMode, activeModule, setActiveModule, systemLogs, logAction }}>
      {children}
    </QuantumContext.Provider>
  );
};

export const useQuantum = () => useContext(QuantumContext);
