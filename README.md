# Deno RESTful API using OAK

<img src="https://deno.land/images/deno_logo.png" alt="logo" width="300"/>

This is a starter project to create Deno RESTful API using oak. [oak](https://github.com/oakserver/oak) is a middleware framework and router middleware for Deno, inspired by popular Node.js framework [Koa](https://koajs.com/) and [@koa/router](https://github.com/koajs/router/).

Note: Only Deno 1.0 is supported at the moment (work is ongoing to support newer versions).

This project covers
- Swagger Open API doc
- Docker container environment
- JWT authentication 
- User authorization
- Request validation
- .env config management
- Coding architecture with `Router`, `Service` & `Repository` layers
- Application Error Handling
- Request timing logging
- Generic request logging

## Important links
 1) [Setup](#setup)
 2) [Migrations](#migrations)
 3) [Modules](#modules)
 4) [Project Layout](#project-layout)
 5) [How to add a new route](#how-to-add-a-new-route)
 6) [How to validate request body](#how-to-validate-request-body)
 7) [How to use JWT authorization](#how-to-use-jwt-authorization)
 8) [How to add auth guards](#how-to-add-auth-guards)
 9) [Error handling](#error-handling)
 10) [Contributing](#contributing)
 11) [Contributors](#contributors)
 12) [Roadmap](#roadmap)

## Setup
We can run the project **with/ without Docker**. 
- **Pre-Requisite**
    - For dockerized environment we need 
        - docker, 
        - docker-compose installed.
    - To run API server without Docker we need
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
    $ deno run --allow-read --allow-net --unstable --importmap importmap/map.json app.ts
    ```
- **API** 
    - Browse `API` at [http://localhost:8000](http://localhost:8000)
    - Browse (for Docker only) DB `Adminer` at [http://localhost:8080](http://localhost:8080)
    - Browse `Swagger Open API` Doc at [http://localhost:8105](http://localhost:8105)

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
|[oak@v6.2.0](https://deno.land/x/oak@v6.2.0)| Deno middleware framework|
|[dotenv@v0.4.2](https://deno.land/x/dotenv@v0.4.2)| Read env variables|
|[mysql@2.2.0](https://deno.land/x/mysql@2.2.0)|MySQL driver for Deno|
|[nessie@v1.0.0-rc3](https://deno.land/x/nessie@v1.0.0-rc3)| DB migration tool for Deno|
|[validasaur@v0.7.0](https://deno.land/x/validasaur@v0.7.0)| validation library|
|[djwt@v1.4](https://deno.land/x/djwt@v1.4)| JWT token encoding|
|[bcrypt@v0.2.1](https://deno.land/x/bcrypt@v0.2.1)| bcrypt encription lib|

### Project Layout 

```
.
├── .env (Make sure to create this file from given .env.example)
├── config/
|   |── config.ts (configuration object)
├── db/
|   |── migrations/
|   |── seeds/
|   ├── db.ts (DB connection object)
├── middlewares/
├── migrations/
├── services/
├── repositories/
├── helpers/
├── routes/
|── types/
|── types.ts (all types exported here)
├── app.ts (application server)
├── openapi.yml (Swagger open api definition)
└── nessie.config.ts (DB configuration for nessie migration)
```

## How to add a new route
- Router hanlders are defined in `routes` folder. For each entity there should be separate routes file. For example user related CRUD router handlers are defined in `user.routes.ts` file.
- All routes are bind with router handlers in `routes.ts` file. 
- To create CRUD for `cat`
    - Create file `cat.routes.ts`
    - Write router handler methods, 
    ```
    //cat.routes.ts
    import * as catService from "./../services/cat.service.ts";
    /**
    * get list of cats 
    */
    const getCats = [
        async (ctx: Context) => {
            const cats = await catService.getCats();
            ctx.response.body = cats;
        }
    ];

    //export route handler methods
    exports { getCats };
    ```
    - Then bind `getCats` route handler with router in `routes.ts` file - 
    ```
    //routes.ts
    import * as catRoutes from "./cat.routes.ts";

    // ... router initialization codes

    router
        .get("/cats", ...catRoutes.getCats);
    ```

## How to validate request body
- Here we used [validasaur@v0.7.0](https://deno.land/x/validasaur@v0.7.0) module for validating forms or request body. List of available rules can be found [here](https://deno.land/x/validasaur@v0.7.0/#available-rules) 
- [requestValidator](./middlewares/request-validator.middleware.ts) middleware added to validate the request body.
```
//auth.routes.ts
import {
  required,
  isEmail,
} from "https://deno.land/x/validasaur@v0.7.0/src/rules.ts";

import { requestValidator } from "./../middlewares/request-validator.middleware.ts";

/** 
 * request body schema 
 * for cat create/update 
 * */
const catSchema = {
  name: [required],
  email: [required, isEmail],
};

/**
 * create cat
 */
const createCat = [
  /** request validation middleware */
  requestValidator({ bodyRules: catSchema }),
  /** router handler */
  async (ctx: Context) => {
    // ... router handler code to create cat
  },
];
```

## How to use JWT authorization
- Here, We used JWT based authentication
- Necessary JWT constants should be configured in `.env` (copy from `.env.example`).
```
# Access token validity in ms
JWT_ACCESS_TOKEN_EXP=600000

# Refresh token validity in ms
JWT_REFRESH_TOKEN_EXP=3600000

# Secret secuirity string
JWT_TOKEN_SECRET=HEGbulKGDblAFYskBLml
```
- Request header should contain JWT bearer token as `Authorization` key.
- Middleware [JWTAuthMiddleware](./middlewares/jwt-auth.middleware.ts) used to parse the `Authorization` header and decode the payload as `ctx.user`. 

## How to add auth guards
- Auth guards are dependent on the `ctx.user` provided by [JWTAuthMiddleware](./middlewares/jwt-auth.middleware.ts) middleware.
- To define different levels of authentication guard in different route handlers, middleware [userGuard](./middlewares/user-guard.middleware.ts) defined.
- `userGuard` middleware optionally takes allowed user's roles as parameter. Otherwise, it will check only for the signed user.
- Here is the example usage:-
```
//user.routes.ts

/**
 * get list of users 
 * user with ADMIN role only can access
 */
const getUsers = [
  userGuard(UserRole.ADMIN),
  async (ctx: Context) => {
    // ... route handlers code
  },
];


/**
 * get signed user detail 
 * any authenticated user can access
 */
const getMe = [
  userGuard(),
  async (ctx: Context) => {
    // ... route handlers code
  },
];
```


## Error handling

### Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/asad-mlbd/deno-api-starter-oak. 

## Contributors
- [Asad Rahman](https://github.com/asad-mlbd)

## Roadmap

- [x] Open API integration
- [x] API Doc
- [x] Validation
- [x] JWT Auth
- [ ] Unit Testing
- [ ] Logger
