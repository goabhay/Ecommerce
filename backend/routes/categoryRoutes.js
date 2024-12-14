import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddlerware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryCOntroller,
} from "../controller/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update cotegory

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", categoryController);

router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
