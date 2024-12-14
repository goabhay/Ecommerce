import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.cookies["login"];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization token required",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if user is signed in then add user field in req header
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user || user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
