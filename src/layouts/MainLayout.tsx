import { Outlet } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

export default function MainLayout() {
  const { user, roles } = useAuth();
  const isAdmin = roles.includes("admin");
  const currentYear = new Date().getFullYear();
  return (
    <>
      <NavBar username={user.username} isAdmin={isAdmin} />
      <Outlet />
      <footer className="flex justify-center py-3 dark:text-neutral-500">
        Александр Костромин | {currentYear}
      </footer>
    </>
  );
}
