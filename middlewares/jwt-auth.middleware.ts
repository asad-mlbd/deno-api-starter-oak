import { Context, AuthUser } from "./../types.ts";
import { validateJwt } from "https://deno.land/x/djwt@v0.9.0/validate.ts";

/**
 * Decode token and returns payload
 * if given token is not expired 
 * and valid with respect to given `secret`
 */
const getJwtPayload = async (token: string, secret: string): Promise<any | null> => {
  try {
    const jwtObject = await validateJwt(token, secret);
    if (jwtObject && jwtObject.payload) {
      return jwtObject.payload;
    }
  } catch (err) {}
  return null;
};


/***
 * JWTAuth middleware
 * Decode authorization bearer token
 * and attach as an user in application context
 */
const JWTAuthMiddleware = (JWTSecret: string) => {
  return async (
    ctx: Context,
    next: () => Promise<void>,
  ) => {
    try {
      const authHeader = ctx.request.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace(/^bearer/i, "").trim();
        const user = await getJwtPayload(token, JWTSecret);

        if (user) {
          ctx.user = user as AuthUser;
        }
      }
    } catch (err) { }

    await next();
  };

}

export { JWTAuthMiddleware };
