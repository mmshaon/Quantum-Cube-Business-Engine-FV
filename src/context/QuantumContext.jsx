import React, { createContext, useContext, useState } from 'react';

const QuantumContext = createContext();

export const QuantumProvider = ({ children }) => {
  const [isGodMode, setIsGodMode] = useState(false);
  const [activeModule, setActiveModule] = useState("VIRTUAL");
  const [systemLogs, setSystemLogs] = useState(["[SYSTEM] Initialized QCBE-MAX"]);

  return (
    <QuantumContext.Provider value={{ isGodMode, setIsGodMode, activeModule, setActiveModule, systemLogs }}>
      {children}
    </QuantumContext.Provider>
  );
};

export const useQuantum = () => useContext(QuantumContext);
