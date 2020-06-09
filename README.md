# Deno RESTful API using OAK

<img src="https://deno.land/images/deno_logo.png" alt="logo" width="300"/>

This is a starter project to create Deno RESTful API using oak. [oak](https://github.com/oakserver/oak) is a middleware framework and router middleware for Deno, inspired by popular Node.js framework [Koa](https://koajs.com/) and [@koa/router](https://github.com/koajs/router/).

## Important links
 1) [Setup](#setup)
 2) [Migrations](#migrations)
 3) [Modules](#modules)
 4) [Project Layout](#project-layout)
 5) [Contributing](#contributing)
 6) [Contributors](#contributors)
 7) [Roadmap](#roadmap)

## Setup
We can run the project **with/ without Docker**. 
- **Pre-Requisite**
    - For dockerized environment we need 
        - docker, 
        - docker-compose installed.
    - To run API server with out Docker we need
        - MySQL server running &
        - Deno run time installed
- **Configuration**
    - In application root, rename example env file `env.example` to `.env`.
    - An example env file contains MySQL credentials for the dockerized environment. For non-docker setup, **update MySQL credentials** here.
- **Run API**
    - **For Docker**: Up docker-compose, this will create a docker container with the database with the given name in env. 
    ``` 
    $ docker-compose up --build
    ```

    - For non-docker run API server with Deno run time
    ```
    $ deno run --allow-read --allow-net app.ts
    ```
- **API** 
    - Browse `api` at [http://localhost:8000](http://localhost:8000)
    - Browse (for Docker only) DB `adminer` at [http://localhost:8080](http://localhost:8080)

## Migrations 
We use [nessie](https://deno.land/x/nessie) to manage database migration. 
- In the application root, we have `nessie.config.ts`. Make sure to update this with the DB credentials. 
- Run the following command to run the migration. Migration should create necessary tables and dump the data.
```
$ deno run --allow-net --allow-read --allow-write https://deno.land/x/nessie@v1.0.0-rc3/cli.ts migrate
```

With this, the user table would be created and the table would be seeded with fake data

- Further, to add new migration, for example, to create new product table run
```
deno run --allow-net --allow-read --allow-write https://deno.land/x/nessie@v1.0.0-rc3/cli.ts make create_product
```

## Modules


| Package  | Purpose |
| ---------|---------|
|[oak@v5.0.0](https://deno.land/x/oak@v5.0.0)| Deno middleware framework|
|[dotenv@v0.4.2](https://deno.land/x/dotenv@v0.4.2)| Read env variables|
|[mysql@2.2.0](https://deno.land/x/mysql@2.2.0)|MySQL driver for Deno|
|[nessie@v1.0.0-rc3](https://deno.land/x/nessie@v1.0.0-rc3)| DB migration tool for Deno|
|[validasaur@v0.7.0](https://deno.land/x/validasaur@v0.7.0)| validation library|

### Project Layout 

```
.
├── .env (Make sure to create this file from given .env.example)
├── config
|   ├── config.ts (contains config object with env vars as attribute)
├── db
|   ├── db.ts (contains DB connection object)
├── middlewares
|   ├── error.middleware.ts (error handler middleware)
|   ├── logger.middleware.ts (request logger)
|   ├── timing.middleware.ts (timing middleware logging request dispatch time)
|   ├── middlewares.ts (exports all middlewares)
├── migrations (contains DB migration scripts)
├── services
|   ├── services.ts (list services)
|   ├── user.service.ts (user service layer)
├── repositories
|   ├── user.repository.ts (contains repository methods for user table)
├── helpers (contains helper methods)
├── routes
|   ├── user.routes.ts (router handler methods for user routes)
|   ├── routes.ts (bind router handlers with app routes)
├── app.ts (Contains application server)
└── nessie.config.ts (DB configuration for nessie migration)
```
- route handlers should call service layer methods
- service layer should deal with all business logics
- service layer throws a meaningful error if needed
- service layer uses repository layer methods for DB interaction
- repository layer only deals with DB operation without any business logic


## Middlewares
- Middlewares are defined in the `middlewares/` folder.
- Sample middleware added
    - [Logger Middleware](/middlewares/logger.middleware.ts)
    - [Timing Middleware](/middlewares/timing.middleware.ts)
    - [Error Middlerware](/middlewares/error.middleware.ts)
- [More details on writing middleware](https://deno.land/x/oak#application-middleware-and-context).

### Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/asad-mlbd/deno-api-starter-oak. 

## Contributors
- [Asad Rahman](https://github.com/asad-mlbd)

## Roadmap

- [ ] Open API integration
- [ ] Unit Testing
- [ ] API Doc
- [x] Validation
- [ ] JWT Auth
- [ ] Logger
