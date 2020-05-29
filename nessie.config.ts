const configMySql = {
  migrationFolder: `./migrations`,
  connection: {
    hostname: "db",
    username: "root",
    password: "example",
    db: "deno_api_db",
  },
  dialect: "mysql",
};

export default configMySql;
