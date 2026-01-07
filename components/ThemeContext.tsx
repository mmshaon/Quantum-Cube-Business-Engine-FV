
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'quantum' | 'cyberpunk' | 'arctic';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('quantum');

  useEffect(() => {
    // Remove existing theme classes
    document.body.classList.remove('theme-quantum', 'theme-cyberpunk', 'theme-arctic');
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
