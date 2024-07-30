import express from 'express';
const router = express.Router()
import todoController from '../controllers/todoController.js';
import authMiddleware from '../middleware/auth.js';


// Todo create
router.post('/createtodo',authMiddleware,todoController.createtodo);

// gettodo
router.get('/gettodo',authMiddleware,todoController.gettodo);

// delete todo

router.delete('/todos/:id', authMiddleware, todoController.deleteTodo);

// Update todo
router.put('/todos/:id', authMiddleware, todoController.updateTodo);

export default router