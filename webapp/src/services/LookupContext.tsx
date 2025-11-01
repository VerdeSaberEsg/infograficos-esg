import { createContext, useContext, useState, ReactNode } from 'react';
import { LookupResponse } from './types';

interface LookupState {
  response: LookupResponse | null;
  setResponse: (response: LookupResponse | null) => void;
}

const LookupContext = createContext<LookupState | undefined>(undefined);

export const LookupProvider = ({ children }: { children: ReactNode }) => {
  const [response, setResponse] = useState<LookupResponse | null>(null);
  return <LookupContext.Provider value={{ response, setResponse }}>{children}</LookupContext.Provider>;
};

export const useLookup = (): LookupState => {
  const context = useContext(LookupContext);
  if (!context) {
    throw new Error('useLookup deve ser usado dentro de LookupProvider');
  }
  return context;
};
