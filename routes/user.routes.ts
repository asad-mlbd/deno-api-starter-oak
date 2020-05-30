import * as userRepo from "./../repositories/user.repository.ts";

const getUsers = async (ctx: any) => {
  const users = await userRepo.getUsers();
  ctx.response.body = users;
};

const getUserById = async (ctx: any) => {
  const { id } = ctx.params;
  const user = await userRepo.getUserById(id);
  ctx.response.body = user;
};

const createUser = async (ctx: any) => {
  const request = ctx.request;
  const userData = (await request.body()).value;
  const user = await userRepo.createUser(userData);
  ctx.response.body = user;
};

export { getUsers, getUserById, createUser };
