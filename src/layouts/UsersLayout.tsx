import { Outlet, useLoaderData } from "react-router-dom";
import { User } from "../api/users";
import { twMerge } from "tailwind-merge";
import Link from "../components/Link";

export default function UsersLayout() {
  const users = useLoaderData() as User[];

  return (
    <main className="flex flex-auto flex-col px-3">
      <h2 className="mb-3 text-2xl font-bold">Пользователи</h2>

      <div className={"flex flex-auto"}>
        <nav
          className={twMerge(
            "h-full w-80 flex-shrink-0",
            "mr-3 pr-3",
            "border-r",
            "dark:border-r-neutral-500",
            "overflow-x-scroll",
          )}
        >
          <ul>
            {users.map((user) => (
              <li key={user.username}>
                <Link to={`/users/${user.username}`}>
                  {user.username}
                  {user.is_admin ? " ★" : ""}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet />
      </div>
    </main>
  );
}
