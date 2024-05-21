import { Outlet } from "react-router-dom";
import { AuthProvider } from "../providers/AuthProvider";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
