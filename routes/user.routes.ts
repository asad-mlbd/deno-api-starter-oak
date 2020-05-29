import * as userRepo from "./../repositories/user.repository.ts";

const getUsers = async (ctx: any) => {
  try {
    const users = await userRepo.getUsers();
    ctx.response.body = JSON.stringify(users);
  } catch (err) {
    ctx.response.body = err.message;
    console.log(err);
  }
};

const getUserById = async (ctx: any) => {
  const { id } = ctx.params;
  const user = await userRepo.getUserById(id);
  ctx.response.body = JSON.stringify(user);
};

const createUser = async (ctx: any) => {
  const request = ctx.request;
  const userData = (await request.body()).value;
  try {
    const user = await userRepo.createUser(userData);
    ctx.response.body = JSON.stringify(user);
  } catch (err) {
    ctx.response.body = err.message;
    console.log(err);
  }
};

export { getUsers, getUserById, createUser };
