import {
  Context,
  helpers,
  Status,
} from "https://deno.land/x/oak@v5.0.0/mod.ts";
import * as userRepo from "./../repositories/user.repository.ts";

const getUsers = async (ctx: Context) => {
  const users = await userRepo.getUsers();
  ctx.response.body = users;
};

const getUserById = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const user = await userRepo.getUserById(+id);
  ctx.response.body = user;
};

const createUser = async (ctx: Context) => {
  const request = ctx.request;
  const userData = (await request.body()).value;
  const user = await userRepo.createUser(userData);
  ctx.response.body = user;
};

const updateUser = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const request = ctx.request;
  const userData = (await request.body()).value;
  const user = await userRepo.updateUser(+id, userData);
  ctx.response.body = user;
};

const deleteUser = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  await userRepo.deleteUser(+id);
  ctx.response.status = Status.NoContent;
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
