import { Router } from "https://deno.land/x/oak/mod.ts";
import * as userRoutes from "./user.routes.ts";

const router: Router = new Router();

router.get("", (ctx) => {
  ctx.response.body = "hello world";
});

router
  .get("/users", userRoutes.getUsers)
  .get("/users/:id", userRoutes.getUserById)
  .post("/users", userRoutes.createUser);

export { router };
