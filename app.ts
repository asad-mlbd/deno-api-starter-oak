import { Application } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import * as middlewares from "./middlewares/middlewares.ts";
import { router } from "./routes/routes.ts";
import { Context } from "./types.ts";

const port = 8000;
const app = new Application<Context>();

app.use(middlewares.errorMiddleware);
app.use(middlewares.loggerMiddleware);
app.use(middlewares.timingMiddleware);
app.use(middlewares.JWTAuthMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
