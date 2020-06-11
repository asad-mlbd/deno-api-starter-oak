import { Context } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import {
  required,
  isEmail,
  lengthBetween,
} from "https://deno.land/x/validasaur@v0.7.0/src/rules.ts";

import * as userService from "./../services/user.service.ts";
import { requestValidator } from "./../middlewares/request-validator.middleware.ts";

/** 
 * request body schema 
 * for user create/update 
 * */
const userSchema = {
  name: [required],
  email: [required, isEmail],
  password: [required, lengthBetween(6, 12)],
};

//todo: add validation alphanumeric, spechal char

/**
 * register user
 */
const register = [
  /** request validation middleware */
  requestValidator({ bodyRules: userSchema }),
  /** router handler */
  async (ctx: Context) => {
    const request = ctx.request;
    const userData = (await request.body()).value;
    const user = await userService.createUser(userData);

    ctx.response.body = user;
  },
];

export { register };
