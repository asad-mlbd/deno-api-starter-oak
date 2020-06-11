import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt@v0.9.0/create.ts";

const key = "your-secret";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const getAuthToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    name: user.name,
    email: user.email,
    exp: setExpiration(new Date().getTime() + 60000),
  };

  return makeJwt({ header, payload, key });
};

export { getAuthToken };
