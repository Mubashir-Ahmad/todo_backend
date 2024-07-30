import express from 'express';
const router = express.Router()
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';


// Register user
router.post('/signup',userController.signup);

// Login
router.post('/login',userController.login);

export default router