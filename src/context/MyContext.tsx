// src/context/MyContext.tsx
import { createContext, useContext } from 'react';

type MyContextType = {
  basename: string;
};

const MyContext = createContext<MyContextType | null>(null);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('Must use within MyContextProvider');
  }
  return context;
};

export const MyContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MyContext.Provider value={{ basename: '/home' }}>
      {children}
    </MyContext.Provider>
  );
};
