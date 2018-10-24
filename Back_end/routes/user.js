import express from 'express';
import * as userController from '../controllers/user';

const router = express.Router();

router.get('/users', userController.getPopular);

export default router;
