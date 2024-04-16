import {Router} from 'express';
import { signIn, signUp, verifyEmail, google,forgotPassword,resetPassword, updatePassword } from '../controllers/auth.controller.js';



const router = Router();

router.post('/signUp',signUp);
router.get('/verifyEmail',verifyEmail);
router.post('/signIn',signIn);
router.post('/google',google)
router.post('/forgotPassword',forgotPassword);
router.get('/resetPassword',resetPassword);
router.post('/updatePassword',updatePassword);


export default router;