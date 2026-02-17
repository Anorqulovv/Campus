import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction, FC } from "react";

interface ContextType {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext<ContextType>({} as ContextType);

export const TokenContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  return (
    <context.Provider value={{ token, setToken }}>
      {children}
    </context.Provider>
  );
};
