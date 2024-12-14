import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, answer } = req.body;
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(400).send("Please fill all details");
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    } else {
      const hashedPassword = await hashPassword(password);

      const newUser = await userModel.create({
        name,
        email,
        phone,
        role,
        password: hashedPassword,
        address,
        answer,
      });
      //newUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "User registered successfully",
        user: newUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: err.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("login", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: err.message,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error occurred while logging out",
    });
  }
};
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Forget password error:", err);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//update prfole

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate password if provided
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};
