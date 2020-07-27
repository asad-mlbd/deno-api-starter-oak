import { Context } from "./../types.ts";
const loggerMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  await next();
  const reqTime = ctx.response.headers.get("X-Response-Time");
  const reqId = ctx.response.headers.get("X-Response-Id");
  const status = ctx.response.status;
  console.log(
    `${reqId} ${ctx.request.method} ${ctx.request.url} - ${reqTime} status: ${status}`,
  );
};

export { loggerMiddleware };
