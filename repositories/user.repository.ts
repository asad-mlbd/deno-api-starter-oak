import { db } from "./../db/db.ts";

/**
 * Get all users list
 */
const getUsers = async () => {
  return await db.query(`
    SELECT 
      id, name, email, 
      is_active, created_at, updated_at 
    FROM users
  `);
};

/**
 * get user by user id
 */
const getUserById = async (id: number) => {
  const users = await db.query(
    `
    SELECT
      id, name, email, 
      is_active, created_at, updated_at
    FROM users where id = ? limit 0, 1`,
    [id],
  );
  return users.length ? users[0] : null;
};

/**
 * get user by email
 * return user info with password
 */
const getUserByEmail = async (email: string) => {
  const users = await db.query(
    `
    SELECT
      id, name, email, password,
      is_active, created_at, updated_at
    FROM users where email = ? limit 0, 1`,
    [email],
  );
  return users.length ? users[0] : null;
};

/**
 * Create user
 */
const createUser = async (
  user: { name: string; email: string; password: string },
) => {
  const { name, email, password } = user;
  const { lastInsertId } = await db.query(
    `
    INSERT into users 
      (id, name, email, password, is_active, created_at, updated_at)
    VALUES 
      (DEFAULT, ? , ? , ?, 1, DEFAULT, DEFAULT);
    `,
    [name, email, password],
  );

  return await getUserById(lastInsertId);
};

/**
 * Update user
 */
const updateUser = async (
  id: number,
  user: { name: string; email: string },
) => {
  const { name, email } = user;
  const result = await db.query(
    `
    UPDATE users SET
      name = ?,
      email = ?,
      updated_at = DEFAULT
    WHERE id = ?;
    `,
    [name, email, id],
  );

  return result;
};

/**
 * Delete user
 */
const deleteUser = async (
  id: number,
) => {
  const result = await db.query(
    `
    DELETE FROM users
    WHERE id = ?;
    `,
    [id],
  );
  return result;
};

export {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
