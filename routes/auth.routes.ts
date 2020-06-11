import { Context } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import {
  required,
  isEmail,
  lengthBetween,
} from "https://deno.land/x/validasaur@v0.7.0/src/rules.ts";

import * as userService from "./../services/user.service.ts";
import * as authService from "./../services/auth.service.ts";
import { requestValidator } from "./../middlewares/request-validator.middleware.ts";

/** 
 * request body schema 
 * for user create/update 
 * */
const registrationSchema = {
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
  requestValidator({ bodyRules: registrationSchema }),
  /** router handler */
  async (ctx: Context) => {
    const request = ctx.request;
    const userData = (await request.body()).value;
    const user = await authService.registerUser(userData);
    ctx.response.body = user;
  },
];

/** 
 * login body schema 
 * for user create/update 
 * */
const loginSchema = {
  email: [required, isEmail],
  password: [required, lengthBetween(6, 12)],
};

const login = [
  /** request validation middleware */
  requestValidator({ bodyRules: loginSchema }),
  /** router handler */
  async (ctx: Context) => {
    const request = ctx.request;
    const credential = (await request.body()).value;
    const token = await authService.loginUser(credential);
    ctx.response.body = token;
  },
];

export { login, register };
