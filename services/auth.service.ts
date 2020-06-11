import * as userRepo from "./../repositories/user.repository.ts";
import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import * as encription from "../helpers/encription.ts";
import * as jwt from "../helpers/jwt.ts";

/**
 * register user
 */
export const registerUser = async (userData: any) => {
  try {
    /** encript user's plain password */
    const { password } = userData;
    userData.password = await encription.encript(password);
    return await userRepo.createUser(userData);
  } catch (err) {
    /** handle duplicate email issue */
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
 * login user
 */
export const loginUser = async (credential: any) => {
  /** find user by email */
  const { email, password } = credential;
  const user = await userRepo.getUserByEmail(email);

  if (user) {
    /** check user active status */
    if (user["is_active"]) {
      /** check password */
      const passHash = user.password;
      const isValidPass = await encription.compare(password, passHash);
      /** return token */
      if (isValidPass) {
        return {
          "access_token": jwt.getAuthToken(user),
          "refresh_token": jwt.getRefreshToken(user),
        };
      }
    }
  }

  throw new httpErrors.Unauthorized("Wrong credential");
};
