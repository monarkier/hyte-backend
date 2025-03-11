import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, sleep_duration, sleep_quality, dream_description) VALUES (?, ?, ?, ?)',
      [entry.user_id, entry.sleep_duration, entry.sleep_quality, entry.dream_description],
    );
    console.log('insertEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT sleep_duration, sleep_quality, dream_description, ai_analysis, created_at FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(userId)
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {insertEntry, selectEntriesByUserId};
