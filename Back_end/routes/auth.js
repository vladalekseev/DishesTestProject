import express from 'express';
import * as AuthController from '../controllers/auth';
import { passportGoogle, passportFacebook, passportInstagram } from '../middlewares/checkUserToken';

const router = express.Router();

router.post('/login', AuthController.logIn);
router.post('/signup', AuthController.signUp);
router.post('/oauth/google', passportGoogle, AuthController.socialAuth);
router.post('/oauth/facebook', passportFacebook, AuthController.socialAuth);
router.post('/oauth/instagram', passportInstagram, AuthController.socialAuth);

export default router;
