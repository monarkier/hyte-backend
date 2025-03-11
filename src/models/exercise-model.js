import promisePool from '../utils/database.js';

const insertExercise = async (exercise) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Exercises (user_id, type, duration, intensity, notes) VALUES (?, ?, ?, ?, ?)',
      [exercise.user_id, exercise.type, exercise.duration, exercise.intensity, exercise.notes],
    );
    console.log('insertExercise', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectExercisesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Exercises WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {insertExercise,selectExercisesByUserId};
