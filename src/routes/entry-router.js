import express from 'express';
import {getEntries, postEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('sleep_duration').optional().isFloat({ min: 0 }),
    body('sleep_quality').trim().notEmpty().isString(),
    body('dream_description').optional(),

    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

export default entryRouter;
