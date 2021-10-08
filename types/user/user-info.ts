import type { CreateUser } from "./create-user.ts";
import type { UserRole } from "./user-role.ts";

/** Request body to create user */
export type UserInfo = CreateUser & {
  /** user roles */
  roles: [UserRole];
};
