import { Context as OakContext } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { AuthUser } from "./../auth/auth-user.ts";

/**
 * Custom appilication context
 */
export class Context extends OakContext {
  user?: AuthUser;
}
