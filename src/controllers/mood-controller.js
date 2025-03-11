import { insertMood, selectMoodsByUserId } from "../models/mood-model.js";

const postMood = async (req, res, next) => {
  const newMood = req.body;
  newMood.user_id = req.user.user_id;
  try {
    await insertMood(newMood);
    res.status(201).json({ message: "Mood added." });
  } catch (error) {
    next(error);
  }
};

const getMoods = async (req, res, next) => {
  try {
    const moods = await selectMoodsByUserId(req.user.user_id);
    res.json(moods);
  } catch (error) {
    next(error);
  }
};

export { postMood, getMoods };
