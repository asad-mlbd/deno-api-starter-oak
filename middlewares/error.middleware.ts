import {
  isHttpError,
  Context,
  Status,
} from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { config } from "./../config/config.ts";

const errorMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    /**
     * considering all unhandled errors as internal server error,
     * do not want to share internal server errors to 
     * end user in non "development" mode
     */
    if (!isHttpError(err)) {
      message = config.ENV === "dev" || config.ENV === "development"
        ? message
        : "Internal Server Error";
    }

    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
};

export { errorMiddleware };
