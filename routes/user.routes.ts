import {
  helpers,
  Status,
  httpErrors,
} from "https://deno.land/x/oak@v5.0.0/mod.ts";
import {
  required,
  isEmail,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as userService from "./../services/user.service.ts";
import { requestValidator, userGuard } from "./../middlewares/middlewares.ts";
import type { Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";

/** request body schema for user create/update */
const userSchema = {
  name: [required],
  email: [required, isEmail],
};

/**
 * get list of users 
 * call by ADMIN
 */
const getUsers = [
  userGuard(UserRole.ADMIN),
  async (ctx: Context) => {
    const users = await userService.getUsers();
    ctx.response.body = users;
  },
];

/**
 * get user by id
 * call by ADMIN
 */
const getUserById = [
  userGuard(UserRole.ADMIN),
  async (ctx: Context) => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const user = await userService.getUserById(+id);
    ctx.response.body = user;
  },
];

/**
 * update user
 * call by user himselft or ADMIN 
 */
const updateUser = [
  userGuard(),
  /** request validation middleware */
  requestValidator({ bodyRules: userSchema }),
  /** router handler */
  async (ctx: Context) => {
    /** get user id from params */
    const params = helpers.getQuery(ctx, { mergeParams: true });
    const id = Number(params.id);

    /** auth user */
    const authUser = ctx.user;

    if (authUser) {
      if (id === authUser.id || hasUserRole(authUser, UserRole.ADMIN)) {
        const request = ctx.request;
        const userData = (await request.body()).value;
        const user = await userService.updateUser(+id, userData);
        ctx.response.body = user;
        return;
      }
    }

    throw new httpErrors.Forbidden("Forbidden user role");
  },
];

/**
 * Delete user by admin user
 */
const deleteUser = [
  userGuard(UserRole.ADMIN),
  async (ctx: Context) => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    await userService.deleteUser(+id);
    ctx.response.status = Status.NoContent;
  },
];

export { getUsers, getUserById, updateUser, deleteUser };
