import {
  Context,
  helpers,
  Status,
} from "https://deno.land/x/oak@v5.0.0/mod.ts";
import {
  required,
  isEmail,
} from "https://deno.land/x/validasaur@v0.7.0/src/rules.ts";
import { requestValidator } from "./../middlewares/request-validator.middleware.ts";
import * as userService from "./../services/user.service.ts";

/** request body schema for user create/update */
const userSchema = {
  name: [required],
  email: [required, isEmail],
};

/**
 * get list of users
 */
const getUsers = async (ctx: Context) => {
  const users = await userService.getUsers();
  ctx.response.body = users;
};

/**
 * get user by id
 */
const getUserById = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const user = await userService.getUserById(+id);
  ctx.response.body = user;
};

/**
 * update user
 */
const updateUser = [
  /** request validation middleware */
  requestValidator({ bodyRules: userSchema }),
  /** router handler */
  async (ctx: Context) => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const request = ctx.request;
    const userData = (await request.body()).value;
    const user = await userService.updateUser(+id, userData);
    ctx.response.body = user;
  },
];

/**
 * Delete user
 */
const deleteUser = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  await userService.deleteUser(+id);
  ctx.response.status = Status.NoContent;
};

export { getUsers, getUserById, updateUser, deleteUser };
