import promisePool from '../utils/database.js';

const insertMood = async (mood) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Mood (user_id, mood, notes) VALUES (?, ?, ?)',
      [mood.user_id, mood.mood, mood.notes],
    );
    console.log('insertExercise', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectMoodsByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Mood WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {insertMood,selectMoodsByUserId};
