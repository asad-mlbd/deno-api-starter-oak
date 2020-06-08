import { db } from "./../db/db.ts";

/**
 * Get all users list
 */
const getUsers = async () => {
  return await db.query(`select * from users`);
};

/**
 * get user by user id
 */
const getUserById = async (id: number) => {
  const users = await db.query(
    `select * from users where id = ? limit 0, 1`,
    [id],
  );
  return users.length ? users[0] : null;
};

/**
 * Create user
 */
const createUser = async (user: { name: string; email: string }) => {
  const { name, email } = user;
  const { lastInsertId } = await db.query(
    `
    INSERT into users
    VALUES (DEFAULT, ? , ? , 1, DEFAULT, DEFAULT);
    `,
    [name, email],
  );
  const users = await db.query(
    `SELECT * from users where id = ? limit 0, 1`,
    [lastInsertId],
  );

  return users[0];
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

export { getUsers, getUserById, createUser, updateUser, deleteUser };
