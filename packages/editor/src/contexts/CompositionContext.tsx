import { createContext, useContext, useState, type ReactNode } from 'react';

interface ICompositionContextType {
  isComposing: boolean;
  setIsComposing: (value: boolean) => void;
}

const CompositionContext = createContext<ICompositionContextType | undefined>(undefined);

export const CompositionProvider = ({ children }: { children: ReactNode }) => {
  const [isComposing, setIsComposing] = useState(false);

  return (
    <CompositionContext.Provider value={{ isComposing, setIsComposing }}>
      {children}
    </CompositionContext.Provider>
  );
};

export const useComposition = () => {
  const context = useContext(CompositionContext);
  if (context === undefined) {
    throw new Error('useComposition must be used within a CompositionProvider');
  }
  return context;
};
