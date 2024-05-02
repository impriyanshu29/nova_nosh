import { Router } from "express";
import { addToWhistList ,getWhistList } from "../controllers/whistList.controller.js";
const router = Router();


router.post('/addWhistList/:userId/:menuId',addToWhistList);
router.get('/getWhistList/:userId',getWhistList);

export default router;