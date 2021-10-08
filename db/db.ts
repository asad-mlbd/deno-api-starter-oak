import { Client } from "https://deno.land/x/mysql@v2.6.1/mod.ts";
import { config } from "./../config/config.ts";

const port = config.DB_PORT ? parseInt(config.DB_PORT || "") : undefined;

const db = await new Client().connect({
  port,
  hostname: config.DB_HOST,
  username: config.DB_USER,
  db: config.DB_NAME,
  password: config.DB_PASS,
});

export { db };
