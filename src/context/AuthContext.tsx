import { createContext, useState, ReactNode } from "react";

interface IAuthContext {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  auth: false,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);
  console.log("🚀 ~ file: AuthContext.tsx:15 ~ AuthProvider ~ auth:", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
