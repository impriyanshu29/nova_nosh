import {Router} from 'express';
import { signUp, verifyEmail } from '../controllers/auth.controller.js';



const router = Router();

router.post('/signUp',signUp);
router.get('/verifyEmail',verifyEmail);


export default router;