import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NavigationSection = 'home' | 'statistics' | 'favorites' | 'recent' | 'settings';

interface NavigationContextType {
  activeSection: NavigationSection;
  navigate: (section: NavigationSection) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  activeSection: 'home',
  navigate: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [activeSection, setActiveSection] = useState<NavigationSection>('home');

  const navigate = (section: NavigationSection) => {
    setActiveSection(section);
  };

  return (
    <NavigationContext.Provider value={{ activeSection, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};