import { insertExercise, selectExercisesByUserId} from "../models/exercise-model.js";

const postExercise = async (req, res, next) => {
  // user_id,
  const newExercise = req.body;
  newExercise.user_id = req.user.user_id;
  try {
    await insertExercise(newExercise);
    res.status(201).json({message: "Exercise added."});
  } catch (error) {
    next(error);
  }
};

/**
 * Get all exercises of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getExercises = async (req, res, next) => {
  try {
    const exercises = await selectExercisesByUserId(req.user.user_id);
    res.json(exercises);
  } catch (error) {
    next(error);
  }
};

export {postExercise,getExercises};
