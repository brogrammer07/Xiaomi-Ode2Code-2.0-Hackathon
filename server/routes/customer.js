import express from "express";
import auth from "../middleware/auth.js";
import {
  getCustomerData,
  createCustomer,
  updateCustomer,
} from "../controllers/customer.js";
const router = express.Router();

router.post("/customer/getCustomerDetail", getCustomerData);
router.post("/customer/create", createCustomer);
router.post("/customer/update", updateCustomer);

export default router;
