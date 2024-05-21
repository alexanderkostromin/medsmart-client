import { createContext, useContext } from "react";
import { AuthRole, AuthUser } from "../security/jwt";

export type AuthContext = {
  user: AuthUser;
  roles: AuthRole[];
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export default function useAuth() {
  return useContext(AuthContext);
}
