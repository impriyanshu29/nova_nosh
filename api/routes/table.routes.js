import Router from 'express';
import { allTables, cancelTable, confirmTable, createTable, deleteTable, getTable, updateTable } from '../controllers/table.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.post('/tableBooking',verifyJWT,createTable);
router.delete('/deleteTable/:tableId',verifyJWT,deleteTable);
router.patch('/updateTable/:tableId',updateTable);
router.patch('/cancelTable/:tableId',cancelTable);
router.get('/tableDetails/:userId',allTables)
router.patch('/confirmTable/:tableId',verifyJWT,confirmTable)
router.get('/table/:tableId',verifyJWT,getTable)
export default router;