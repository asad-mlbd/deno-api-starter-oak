import {
  Migration,
} from "https://deno.land/x/nessie@v1.0.0-rc3/mod.ts";
import { Schema } from "https://deno.land/x/nessie@v1.0.0-rc3/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.create("users", (table) => {
    table.id();
    table.string("name", 256);
    table.string("email", 256);
    table.boolean("is_active");
    table.timestamps();
  });

  queryBuilder.queryString(
    `
    INSERT into users VALUES
      (DEFAULT, 'Asad Rahman', 'asad.dk.bd@gmail.com', 1, DEFAULT, DEFAULT),
      (DEFAULT, 'Ida Watson', 'ida.watson@example.com', 1, DEFAULT, DEFAULT),
      (DEFAULT, "Marshall Barrett", "marshall.barrett@example.com", 1, DEFAULT, DEFAULT),
      (DEFAULT, 'John Doe', 'john@example.com', 1, DEFAULT, DEFAULT);
    `,
  );

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("users");
};
