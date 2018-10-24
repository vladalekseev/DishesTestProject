import express from 'express';
import * as OrderController from '../controllers/order';
import { passportJWT } from '../middlewares/checkUserToken';
import parseOrder from '../middlewares/parseOrder';

const router = express.Router();

router.get('/orders', OrderController.getActive);
router.get('/orders/days', OrderController.getDays);
router.post('/orders', passportJWT, parseOrder, OrderController.create);
router.put('/orders/:id', passportJWT, OrderController.change);

export default router;
