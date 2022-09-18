import express from "express";
import auth from "../middleware/auth.js";
import {
  getCustomerData,
  createCustomer,
  updateCustomer,
  getPoints,
  usePoints,
} from "../controllers/customer.js";
const router = express.Router();

router.post("/customer/getCustomerDetail", auth, getCustomerData);
router.post("/customer/create", createCustomer);
router.post("/customer/update", auth, updateCustomer);
router.post("/customer/points/get", auth, getPoints);
router.post("/customer/points/use", auth, usePoints);

export default router;
