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
 * Remove user by ID
 * @param {number} userId - ID of the user to be deleted
 * @returns {Promise<boolean>} - True if a row was deleted, false otherwise
 */
const removeUser = async (userId) => {
  try {
    await promisePool.query('DELETE FROM DiaryEntries WHERE user_id = ?', [userId]);
    await promisePool.query('DELETE FROM Exercises WHERE user_id = ?', [userId]);
    await promisePool.query('DELETE FROM Mood WHERE user_id = ?', [userId]);
    const [result] = await promisePool.query(
      'DELETE FROM Users WHERE user_id = ?',
      [userId]
    );
    console.log('removeUser result:', result);
    return result.affectedRows > 0; // Palauttaa true, jos jotain poistettiin
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('database error');
  }
};

export {
  selectAllUsers,
  selectUserById,
  selectUserByUsername,
  insertUser,
  removeUser,
};
