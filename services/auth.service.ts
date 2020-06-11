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

export const refreshToken = async (token: string) => {
  try {
    // todo: check token intention
    const payload = await jwt.getJwtPayload(token);
    if (payload) {
      /** get user from token */
      const id = payload.id as number;
      const user = await userRepo.getUserById(id);

      if (user) {
        /** check user active status */
        if (!user["is_active"]) {
          throw new httpErrors.Unauthorized("Inactive user status");
        }

        return {
          "access_token": jwt.getAuthToken(user),
          "refresh_token": jwt.getRefreshToken(user),
        };
      }
    }
  } catch (err) {
    throw new httpErrors.Unauthorized("Invalid token object");
  }
};
