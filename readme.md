# Deno REST API using OAK

<img src="https://deno.land/images/deno_logo.png" alt="logo" width="300"/>

[oak](https://github.com/oakserver/oak) is a middleware framework and router middleware for DENO, inspired by popular node.js framework [Koa](https://koajs.com/) and [@koa/router](https://github.com/koajs/router/). This is a starter project to create deno rest API using oak. 

## Prepare environment (docker)
- **pre-requisites**: System requires following tools to be pre-installed in the system
    - docker, 
    - docker-compose.
- **environment**: In application root, we have an example environment file with default DB credentials as variables. Rename `env.example` to `.env`. Optionally we can change the environment variables also.
- **docker**: Up docker-compose, this will create a docker container with the database with the given name in env. 
``` 
$ docker-compose up --build
```
- Now we should able to browse `api`, db `adminer` 
    - adminer at [http://localhost:8080](http://localhost:8080)
    - api at [http://localhost:8000](http://localhost:8000)

- **migration**: We use [nessie](https://deno.land/x/nessie) to manage database migration. 
    - In the application root, we have `nessie.config.ts`. Make sure we have the correct DB credential being set (same as `.env`). 
    - Check docker container name using `docker ps`.
    - Run the following command to run the migration. Migration should create necessary tables and dump the data.
```
$ docker exec -it api-starter-deno_deno_1 deno run --allow-net --allow-read https://deno.land/x/nessie/cli.ts migrate
```

- With the above step, the user table should be created and dumped with some user list. Browse [http://localhost:8000/users](http://localhost:8000/users) to get a list of users.