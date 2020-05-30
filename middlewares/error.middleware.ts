import {
  isHttpError,
  Context,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import { config } from "./../config/config.ts";

const errorMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (err) {
    if (!isHttpError(err)) {
      /** internal error message should not be shown other than dev env */
      const message = config.ENV === "dev" || config.ENV === "development"
        ? err.message
        : "Internal Server Error";

      ctx.response.body = { message };
      ctx.response.status = Status.InternalServerError;
    }
  }
};

export { errorMiddleware };
