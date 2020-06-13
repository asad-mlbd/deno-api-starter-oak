/** Request body to create user */
export type CreateUser = {
  /** user name */
  name: string;
  /** user email */
  email: string;
  /** user password */
  password: string;
  /** roles */
};
