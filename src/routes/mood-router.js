import express from 'express';
import { body } from 'express-validator';
import { postMood, getMoods } from '../controllers/mood-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handler.js';

const moodRouter = express.Router();

// Kaikki reitit vaativat autentikoinnin
moodRouter.use(authenticateToken);

// Hae kaikki käyttäjän mielialat
moodRouter.get('/', getMoods);

// Lisää uusi mieliala
moodRouter.post(
  '/',
  body('mood').trim().notEmpty().isString(),
  body('notes').optional().isString(),
  validationErrorHandler,
  postMood
);

export default moodRouter;
