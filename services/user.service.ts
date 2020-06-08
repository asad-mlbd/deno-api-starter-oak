import * as userRepo from "./../repositories/user.repository.ts";
import { httpErrors, HttpError } from "https://deno.land/x/oak@v5.0.0/mod.ts";

/**
 * get user by id
 */
export const getUserById = async (id: number) => {
  const user = await userRepo.getUserById(id);
  if (!user) {
    throw new httpErrors.NotFound("User not found");
  }

  return user;
};

/**
 * get users list
 */
export const getUsers = async () => {
  const users = await userRepo.getUsers();
  return users;
};

/**
 * create user
 */
export const createUser = async (userData: any) => {
  // todo: validation
  // todo: catch db error
  const user = await userRepo.createUser(userData);
  return user;
};

/**
 * update user
 */
export const updateUser = async (id: number, userData: any) => {
  // todo: validation
  // todo: catch db error
  const result = await userRepo.updateUser(id, userData);
  if (result["affectedRows"]) {
    const user = await userRepo.getUserById(id);
    if (user) {
      return user;
    }
  }

  throw new httpErrors.NotFound("User not found");
};

/**
 * delete user
 */
export const deleteUser = async (id: number) => {
  // todo: catch db error
  const result = await userRepo.deleteUser(id);
  if (!result["affectedRows"]) {
    throw new httpErrors.NotFound("User not found");
  }
};
