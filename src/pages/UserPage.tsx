import { useFetcher, useLoaderData } from "react-router-dom";
import { User } from "../api/users";
import Button from "../components/Button";
import useAuth from "../contexts/AuthContext";

function UserRoleToggle({
  user,
  disabled = false,
}: {
  user: User;
  disabled?: boolean;
}) {
  const fetcher = useFetcher();
  const roleAction = user.is_admin ? "demote" : "promote";
  const label = user.is_admin ? "Понизить" : "Повысить";
  return (
    <fetcher.Form method="patch">
      <Button disabled={disabled} name="roleAction" value={roleAction}>
        {label}
      </Button>
    </fetcher.Form>
  );
}

export default function UserPage() {
  const { user: loggedUser } = useAuth();
  const user = useLoaderData() as User;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p>Имя пользователя: {user.username}</p>
        <p>Роль: {user.is_admin ? "Администратор" : "Пользователь"}</p>
      </div>
      <UserRoleToggle disabled={loggedUser.id === user.id} user={user} />
    </div>
  );
}
