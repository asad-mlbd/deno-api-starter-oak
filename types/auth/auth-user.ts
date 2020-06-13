/**
 * Authenticated user info
 * user as JWT access token payload
 */
export type AuthUser = {
  /** user email address */
  email: string;
  /** user name */
  name: string;
  /** user id */
  id: number;
};
