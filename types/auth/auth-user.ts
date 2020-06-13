import { UserRole } from "../user/user-role.ts";

/**
 * Authenticated user info
 * user as JWT access token payload
 */
export type AuthUser = {
  /** user id */
  id: number;
  /** user email address */
  email: string;
  /** user name */
  name: string;
  /** user roles */
  roles: string;
};
