import { Context } from "./../types.ts";
const loggerMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
};

export { loggerMiddleware };
