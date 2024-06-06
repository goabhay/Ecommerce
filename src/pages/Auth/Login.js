import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/login`,
        {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          withCredentials: true,
        } // Include withCredentials here in the main request configuration object
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(login({ user: res.data.user, token: res.data.token }));
      navigate(location.state || "/");
      toast.success("Login successfully");
    } catch (err) {
      console.error("Login error:", err.message);
    }

    setInfo({ ...userInfo, email: "", password: "" });
  };

  return (
    <div>
      <Layout title={"Register Ecommerce"}>
        <div className="form-container">
          <Toaster />
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Name"
                value={userInfo.name}
                onChange={(e) => {
                  setInfo((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>
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
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
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
            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={() => navigate("/forgot-password")}
            >
              Forget Password
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Login;
