import express from "express";
import auth from "../middleware/auth.js";
import { createOrder, getAllOrders, getOrder } from "../controllers/order.js";
const router = express.Router();

router.post("/order/create", createOrder);
router.get("/order/getall", auth, getAllOrders);
router.post("/order/get", getOrder);

export default router;
