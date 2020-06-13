import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { Context } from "./../types.ts";
import { UserRole } from "../types.ts";

/**
 * has user role middleware 
 * checks authorization for context user, user roles
 */
const hasUserRole = (roles?: UserRole | UserRole[]) => {
  return async (ctx: Context, next: () => Promise<void>) => {
    // if auth user not found, throw error
    const { user } = ctx;
    if (!user) {
      throw new httpErrors.Unauthorized("Unauthorized user");
    }

    //if roles specified, then check auth user's roles
    if (roles) {
      let isRoleMatched = false;

      const userRoles = user.roles.split(",");
      if (typeof (roles) == "string") {
        roles = [roles];
      }

      roles.forEach((role) => {
        if (userRoles.includes(role)) {
          isRoleMatched = true;
        }
      });

      //if no role mached throw forbidden error
      if (!isRoleMatched) {
        throw new httpErrors.Forbidden("User role does not matched");
      }
    }

    await next();
  };
};

export { hasUserRole };
