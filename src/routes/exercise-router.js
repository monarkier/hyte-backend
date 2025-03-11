import express from 'express';
import { body } from 'express-validator';
import { postExercise, getExercises } from '../controllers/exercise-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handler.js';

const exerciseRouter = express.Router();

// Kaikki reitit vaativat käyttäjän autentikoinnin
exerciseRouter.use(authenticateToken);

// Hae kaikki käyttäjän harjoitukset
exerciseRouter.get('/', getExercises);

// Lisää uusi harjoitus
exerciseRouter.post(
  '/',
  body('type').trim().notEmpty().isString(),
  body('duration').isInt({ min: 1 }),
  body('intensity').optional().isString(),
  body('notes').optional().isString(),
  validationErrorHandler,
  postExercise
);

export default exerciseRouter;
