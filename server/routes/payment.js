import express from "express";
import auth from "../middleware/auth.js";
import { checkout, paymentVerification } from "../controllers/payment.js";
const router = express.Router();

router.post("/payment/checkout", auth, checkout);
router.post("/payment/verification", auth, paymentVerification);

export default router;
