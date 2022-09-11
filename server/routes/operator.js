import express from "express";
import auth from "../middleware/auth.js";
import { login } from "../controllers/operator.js";
const router = express.Router();

router.post("/login", login);
// router.post("/signin", signin);

export default router;
