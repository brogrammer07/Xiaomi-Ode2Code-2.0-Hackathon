import express from "express";
import auth from "../middleware/auth.js";
import {
  addColourToCategory,
  addProductToCategory,
  addSizeToCategory,
  createCategory,
  getAllCategory,
  getDataByCategory,
  getProductBySN,
} from "../controllers/product.js";
const router = express.Router();
router.post("/category/create", createCategory);
router.post("/colour/addcolourtocategory", addColourToCategory);
router.post("/product/addproducttocategory", addProductToCategory);
router.post("/product/getproductbysn", getProductBySN);
router.post("/size/addsizetocategory", addSizeToCategory);
router.get("/category/getall", getAllCategory);
router.post("/category/getcategorydata", getDataByCategory);

export default router;
