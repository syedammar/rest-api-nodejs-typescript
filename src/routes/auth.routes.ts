import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const authRouter: Router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Create a new user
 * @access  (Public)
 */
authRouter.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user and get token
 * @access  (Public)
 */
authRouter.post('/login', loginUser);

export default authRouter;
