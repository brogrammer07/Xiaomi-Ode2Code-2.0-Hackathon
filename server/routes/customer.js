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

router.post("/customer/getCustomerDetail", getCustomerData);
router.post("/customer/create", createCustomer);
router.post("/customer/update", updateCustomer);
router.post("/customer/points/get", getPoints);
router.post("/customer/points/use", usePoints);

export default router;
