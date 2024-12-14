import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  updateProfileController,
} from "../controller/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddlerware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController); // Changed to POST method

router.post("/forgot-password", forgetPasswordController);

router.get("/check", requireSignIn, (req, res) => {
  res.send({
    message: "checked",
  });
});

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
