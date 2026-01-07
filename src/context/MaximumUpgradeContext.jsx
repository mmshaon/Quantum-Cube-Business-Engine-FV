import React, { createContext, useContext, useState } from 'react';

const QCBEContext = createContext();

export const QCBEProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState(1.0);
  const [godModeActive, setGodModeActive] = useState(false);

  return (
    <QCBEContext.Provider value={{ activeModule, setActiveModule, godModeActive, setGodModeActive }}>
      {children}
    </QCBEContext.Provider>
  );
};

export const useQCBE = () => useContext(QCBEContext);
