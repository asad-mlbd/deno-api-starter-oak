import { Context } from "https://deno.land/x/oak@v5.0.0/mod.ts";
const loggerMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
};

export { loggerMiddleware };
