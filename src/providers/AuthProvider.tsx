import { AuthContext } from "../contexts/AuthContext";
import { parseJWTPayload } from "../security/jwt";
import { Navigate, useLocation } from "react-router-dom";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const payload = parseJWTPayload();
  const { pathname, search } = useLocation();
  console.log(payload);
  if (!payload) {
    return <Navigate to="/login" state={{ pathname, search }} />;
  }
  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
}
