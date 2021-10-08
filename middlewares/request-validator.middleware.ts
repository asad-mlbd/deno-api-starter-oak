import {
  validate,
  ValidationErrors,
  ValidationRules,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import type { Context } from "./../types.ts";

/**
 * get single error message from errors
 */
const getErrorMessage = (
  errors: ValidationErrors,
): string | undefined => {
  for (let attr in errors) {
    const attrErrors = errors[attr];
    for (let rule in attrErrors) {
      return attrErrors[rule] as string;
    }
  }
};

/**
 * request validation middleware 
 * validate request body with given validation rules
 */
const requestValidator = ({ bodyRules }: { bodyRules: ValidationRules }) => {
  return async (ctx: Context, next: () => Promise<void>) => {
    /** get request body */
    const request = ctx.request;
    const body = (await request.body()).value;

    /** check rules */
    const [isValid, errors] = await validate(body, bodyRules);
    if (!isValid) {
      /** if error found, throw bad request error */
      const message = getErrorMessage(errors);
      throw new httpErrors.BadRequest(message);
    }

    await next();
  };
};

export { requestValidator };
