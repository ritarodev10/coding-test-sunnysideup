import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface IAuthContext {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

const useAuth = (): IAuthContext => {
  return useContext<IAuthContext>(AuthContext);
};

export default useAuth;
