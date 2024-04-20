import {Router} from 'express';
import { signIn, signUp, verifyEmail, google,forgotPassword,resetPassword, updatePassword, logOut, updateProfile, refreshAccessToken,deleteUser} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { refreshToken } from '../middlewares/refreshToken.middleware.js';


const router = Router();

router.post('/signUp',signUp);
router.get('/verifyEmail',verifyEmail);
router.post('/signIn',signIn);
router.post('/google',google)
router.post('/forgotPassword',forgotPassword);
router.get('/resetPassword',resetPassword);
router.post('/updatePassword',updatePassword);
router.post('/logout',verifyJWT,logOut )
router.post('/updateProfile/:userId',verifyJWT,updateProfile)
router.post('/refreshToken/:refreshToken',refreshAccessToken);
router.delete('/deleteAccount/:userId',verifyJWT,deleteUser)


export default router;