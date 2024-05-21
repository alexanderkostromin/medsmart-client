import Cookies from "js-cookie";
import { z } from "zod";

// class Role(StrEnum):
//     ADMIN = auto()

// class AuthUser(BaseModel):
//     id: uuid.UUID
//     username: str

// class JWTPayload(BaseModel):
//     roles: list[Role]
//     user: AuthUser | None = None

export const AuthRole = z.enum(["admin"]);
export type AuthRole = z.infer<typeof AuthRole>;

export const AuthUser = z.object({
  id: z.string(),
  username: z.string(),
});
export type AuthUser = z.infer<typeof AuthUser>;

export const JWTPayload = z.object({
  roles: z.array(AuthRole),
  user: AuthUser,
});
export type JWTPayload = z.infer<typeof JWTPayload>;

export function parseJWTPayload(): JWTPayload | false {
  // if (import.meta.env.DEV) {
  //   return { roles: ["admin"] };
  // }
  const authCookie = Cookies.get("auth");
  if (!authCookie) {
    return false;
  }
  if (authCookie.split(".").length !== 2) {
    return false;
  }
  try {
    const [, b64_payload] = authCookie.split(".");
    const json = atob(b64_payload);
    const obj = JSON.parse(json);
    return JWTPayload.parse(obj);
  } catch (error) {
    return false;
  }
}
