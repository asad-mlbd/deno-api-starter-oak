import { Context as OakContext } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import type { AuthUser } from "./../auth/auth-user.ts";

/**
 * Custom appilication context
 */
export class Context extends OakContext {
  user?: AuthUser;
}
