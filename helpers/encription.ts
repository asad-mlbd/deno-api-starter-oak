import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.3/mod.ts";
/**
 * encript given string 
 */
const encript = async (password: string) => {
  return await bcrypt.hash(password);
};

/**
 * compare given password and hash
 */
const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { encript, compare };
