import { Router } from "express";
import { getOrder,allOrder,updateOrder,deleteOrder,orderStatus } from "../controllers/orders.controller.js";


const router = Router();

router.get("/order/:userId" , getOrder)
router.get("/allOrder/:userId" , allOrder)
router.patch("/updateOrder/:_id", updateOrder)
router.delete("/deleteOrder/:_id", deleteOrder)
router.get("/orderStatus/:_id", orderStatus)
export default router;