import type {
  Context,
  CreateUser,
  LoginCredential,
  RefreshToken,
} from "./../types.ts";
import {
  required,
  isEmail,
  minLength,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

import * as authService from "./../services/auth.service.ts";
import { requestValidator } from "./../middlewares/request-validator.middleware.ts";

import { config } from "./../config/config.ts";

const { MIN_PASSWORD_LENGTH } = config;

/** 
 * request body schema 
 * for user create/update 
 * */
const registrationSchema = {
  name: [required],
  email: [required, isEmail],
  password: [required, minLength(Number.parseInt(MIN_PASSWORD_LENGTH))],
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
    const userData = await request.body().value as CreateUser;
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
  password: [required, minLength(Number.parseInt(MIN_PASSWORD_LENGTH))],
};

const login = [
  /** request validation middleware */
  requestValidator({ bodyRules: loginSchema }),
  /** router handler */
  async (ctx: Context) => {
    const request = ctx.request;
    const credential = await request.body().value as LoginCredential;
    const token = await authService.loginUser(credential);
    ctx.response.body = token;
  },
];

const refreshTokenSchema = {
  value: [required],
};
const refreshToken = [
  /** request validation middleware */
  requestValidator({ bodyRules: refreshTokenSchema }),
  /** router handler */
  async (ctx: Context) => {
    const request = ctx.request;
    const token = await request.body().value as RefreshToken;

    const auth = await authService.jwtAuth(token);
    ctx.response.body = auth;
  },
];

export { login, register, refreshToken };
