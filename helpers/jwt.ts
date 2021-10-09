import {
  Jose,
  Payload,
  makeJwt,
  setExpiration,
} from "https://deno.land/x/djwt@v1.4/create.ts";
import { validateJwt } from "https://deno.land/x/djwt@v1.4/validate.ts";
import { config } from "./../config/config.ts";

const {
  JWT_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXP,
  JWT_REFRESH_TOKEN_EXP,
} = config;

const JWTAlgorithm = "HS256";

const header: Jose = {
  alg: JWTAlgorithm,
  typ: "JWT",
};

const getAuthToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    exp: setExpiration((Date.now() / 1000) + parseInt(JWT_ACCESS_TOKEN_EXP)),
  };

  return makeJwt({ header, payload, key: JWT_TOKEN_SECRET });
};

const getRefreshToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    exp: setExpiration((Date.now() / 1000) + parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  return makeJwt({ header, payload, key: JWT_TOKEN_SECRET });
};

const getJwtPayload = async (token: string): Promise<any | null> => {
  try {
    const jwtObject = await validateJwt({jwt: token, key: JWT_TOKEN_SECRET, algorithm: [JWTAlgorithm], critHandlers: {}});
    if (jwtObject.isValid) {
      return jwtObject.payload;
    }
  } catch (err) {}
  return null;
};

export { getAuthToken, getRefreshToken, getJwtPayload, JWTAlgorithm };
