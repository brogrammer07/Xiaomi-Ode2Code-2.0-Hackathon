import express from "express";
import auth from "../middleware/auth.js";
import { getCouponData, createCoupon } from "../controllers/coupon.js";
const router = express.Router();

router.post("/coupon/get", getCouponData);
router.post("/coupon/create", createCoupon);

export default router;
