import * as userRepo from "./../repositories/user.repository.ts";
import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { encript } from "../helpers/encription.ts";

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
 * update user
 */
export const updateUser = async (id: number, userData: any) => {
  // todo: validation
  try {
    const result = await userRepo.updateUser(id, userData);
    if (result["affectedRows"]) {
      const user = await userRepo.getUserById(id);
      if (user) {
        return user;
      }
    }
    throw new httpErrors.NotFound("User not found");
  } catch (err) {
    const { message } = err;
    if (message.match("email_unique")) {
      throw new httpErrors.BadRequest(
        `Already user exists with email ${userData.email}`,
      );
    }
    throw err;
  }
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
