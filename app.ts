import { Application } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import * as middlewares from "./middlewares/middlewares.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { router } from "./routes/routes.ts";
import { Context } from "./types.ts";
import { config } from "./config/config.ts";

const port = 8000;
const app = new Application<Context>();

app.use(oakCors());
app.use(middlewares.loggerMiddleware);
app.use(middlewares.errorMiddleware);
app.use(middlewares.timingMiddleware);

const { JWT_TOKEN_SECRET } = config;
app.use(middlewares.JWTAuthMiddleware(JWT_TOKEN_SECRET));
app.use(middlewares.requestIdMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
