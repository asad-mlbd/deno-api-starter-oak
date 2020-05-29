import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("users", (table) => {
    table.id();
    table.string("name", 256);
    table.string("email", 256);
    table.boolean("is_active");
    table.timestamps();
  });

  schema.queryString(
    `
    INSERT into users VALUES
      (DEFAULT, 'Asad Rahman', 'asad.dk.bd@gmail.com', 1, DEFAULT, DEFAULT),
      (DEFAULT, 'Ida Watson', 'ida.watson@example.com', 1, DEFAULT, DEFAULT),
      (DEFAULT, "Marshall Barrett", "marshall.barrett@example.com", 1, DEFAULT, DEFAULT),
      (DEFAULT, 'John Doe', 'john@example.com', 1, DEFAULT, DEFAULT);
    `,
  );
};

export const down = (schema: Schema): void => {
  schema.drop("users");
};
