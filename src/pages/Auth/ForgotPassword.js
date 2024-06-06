import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [userInfo, setInfo] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/forgot-password`,
        {
          email: userInfo.email,
          newPassword: userInfo.password,
          answer: userInfo.answer,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/login");
      toast.success("Password reset successfully");
    } catch (err) {
      console.error("Password reset error:", err.message);
      toast.error("Password reset failed. Please try again.");
    }

    setInfo({ ...userInfo, email: "", password: "", answer: "" });
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container">
        <Toaster />
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => {
                setInfo((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="answerInput"
              aria-describedby="emailHelp"
              placeholder="What is your favorite sport?"
              value={userInfo.answer}
              onChange={(e) => {
                setInfo((prev) => ({ ...prev, answer: e.target.value }));
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="New Password"
              value={userInfo.password}
              onChange={(e) => {
                setInfo((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <br />
        </form>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
