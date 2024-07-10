import { createContext, useMemo, useState } from "react";
import { TOKEN_HISTORY, TokenHistory } from "../api";

export type TokenContextProps = {
  token?: string;
  setToken: (token: string) => void;
  tokenHistories: TokenHistory[];
  setTokenHistories: (tokenHistories: TokenHistory[]) => void;
};

export const TokenContext = createContext<TokenContextProps>({
  token: "",
  setToken: () => {},
  tokenHistories: [],
  setTokenHistories: () => {},
});

export default function TokenContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [token, setToken] = useState<string>("");
  const [tokenHistories, setTokenHistories] = useState<TokenHistory[]>(
    TOKEN_HISTORY.getAll()
  );

  const contextValue = useMemo<TokenContextProps>(() => {
    return {
      token,
      setToken,
      tokenHistories,
      setTokenHistories,
    };
  }, [token, tokenHistories]);

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
}
