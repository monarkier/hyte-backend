import promisePool from '../utils/database.js';

/**
 * Fetch all userdata except passwords from database
 * @returns
 */
const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, created_at, user_level FROM Users',
  );
  console.log('selectAllUsers result', rows);
  return rows;
};

/**
 * Fetch user by id
 * using prepared statement (recommended way)
 * example of error handling
 * @param {number} userId id of the user
 * @returns {object} user found or undefined if not
 */
const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

/**
 * User registration
 * @param {*} user
 * @returns
 */
const insertUser = async (user) => {
  // try {
    const [result] = await promisePool.query(
      'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
      [user.username, user.password, user.email],
    );
    console.log('insertUser', result);
    // return only first item of the result array
    return result.insertId;
  // } catch (error) {
  //   console.error(error);
  //   throw new Error('database error');
  // }
};

/**
 * UNSAFE login for clear text passwords
 * @param {*} username
 * @param {*} password
 * @returns
 */
const selectUserByNameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE username=? AND password=?',
      [username, password],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

/**
 * Fetch all user data based on user's username
 * @param {*} username
 * @returns {object} user data
 */
const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, created_at, user_level FROM Users WHERE username=?',
      [username],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

/**
 * Remove user by ID
 * @param {number} userId - ID of the user to be deleted
 * @returns {Promise<boolean>} - True if a row was deleted, false otherwise
 */
const removeUser = async (userId) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Users WHERE user_id = ?',
      [userId],
    );
    console.log('removeUser result:', result);
    return result.affectedRows > 0; // Palauttaa true, jos jotain poistettiin
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('database error');
  }
};

/**
 * Update user information by ID
 * @param {number} userId - ID of the user to be updated
 * @param {object} userData - Object containing updated user data
 * @returns {Promise<boolean>} - True if a row was updated, false otherwise
 */
const updateUser = async (userId, userData) => {
  try {
    const { username, email, user_level } = userData;

    const [result] = await promisePool.query(
      'UPDATE Users SET username = ?, email = ?, user_level = ? WHERE user_id = ?',
      [username, email, user_level, userId],
    );

    console.log('updateUser result:', result);
    return result.affectedRows > 0; // Palauttaa true, jos jotain päivitettiin
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('database error');
  }
};

export {
  selectAllUsers,
  selectUserById,
  insertUser,
  selectUserByNameAndPassword,
  selectUserByUsername,
  removeUser,
  updateUser,
};
