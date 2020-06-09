import {
  validate,
  ValidationErrors,
  ValidationRules,
} from "https://deno.land/x/validasaur@v0.7.0/src/mod.ts";
import { Context, httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";

/**
 * find single error message 
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
 * generates request validation middleware 
 * for given validation rule
 */
const requestValidator = ({ bodyRules }: { bodyRules: ValidationRules }) => {
  return async (ctx: Context, next: () => Promise<void>) => {
    /** get request body */
    const request = ctx.request;
    const userData = (await request.body()).value;

    /** check rules */
    const [isValid, errors] = await validate(userData, bodyRules);
    if (!isValid) {
      /**if error found, throw bad request error */
      const message = getErrorMessage(errors);
      throw new httpErrors.BadRequest(message);
    }

    await next();
  };
};

export { requestValidator };
