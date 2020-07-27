import { Context } from "./../types.ts";
import { v4 as uuid } from "https://deno.land/std@0.62.0/uuid/mod.ts";

/**
 * requestId middleware
 * attach requestId in request & response header 
 */
const requestIdMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  let requestId = ctx.request.headers.get("X-Response-Id");
  if (!requestId) {
    /** if request id not being set, set unique request id */
    requestId = uuid.generate();
    ctx.request.headers.set("X-Response-Id", requestId.toString());
  }
  await next();
  /** add request id in response header */
  ctx.response.headers.set("X-Response-Id", requestId);
};

export { requestIdMiddleware };
