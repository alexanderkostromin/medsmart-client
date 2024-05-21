import { z } from "zod";
import { APIError } from "./common";
import { ActionFunction, LoaderFunction } from "react-router-dom";

export const User = z.object({
  id: z.string(),
  username: z.string(),
  is_admin: z.boolean(),
});

export type User = z.infer<typeof User>;

export const fetchUser: LoaderFunction = async ({ params }) => {
  const username = params["username"];
  const res = await fetch(`/api/users/${username}`);
  const data = await res.json();
  return User.parse(data);
};

export const fetchAllUsers = async () => {
  const res = await fetch("/api/users/all");
  const data = await res.json();
  return User.array().parse(data);
};

export const changeUserRole: ActionFunction = async ({ request, params }) => {
  const username = params.username!;
  const formData = await request.formData();
  const roleAction = formData.get("roleAction");
  if (roleAction === "promote") {
    return await promoteUser(username);
  }
  if (roleAction === "demote") {
    return await demoteUser(username);
  }
  throw Error("invalid role action");
};

export const promoteUser = async (username: string): Promise<string | null> => {
  const res = await fetch(`/api/users/${username}/promote`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  return null;
};

export const demoteUser = async (username: string): Promise<string | null> => {
  const res = await fetch(`/api/users/${username}/demote`, { method: "PATCH" });
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  return null;
};
