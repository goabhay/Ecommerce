import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFiltersController,
  productListController,
  productCountController,
  realtedProductController,
  productCategoryController,
} from "../controller/productController.js";

import { isAdmin, requireSignIn } from "../middleware/authMiddlerware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

router.get("/related-product/:pid/:cid", realtedProductController);

//product per page
router.get("/product-list/:page", productListController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
