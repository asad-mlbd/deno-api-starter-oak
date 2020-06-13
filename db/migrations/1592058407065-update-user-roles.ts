import { Migration } from "https://deno.land/x/nessie@v1.0.0-rc3/mod.ts";

/** Runs on migrate */
export const up: Migration = () => {
  return `
    ALTER TABLE users
    ADD roles varchar(256) AFTER email;

    UPDATE users SET roles = 'User';
  `;
};

/** Runs on rollback */
export const down: Migration = () => {
  return `
    ALTER TABLE users DROP roles;
  `;
};
