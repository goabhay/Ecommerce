import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { login } from "../../store/authSlice";

const Profile = () => {
  const [auth, setAuth] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setAuth(data);
    }
  }, []);

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Update form fields when user data changes
  useEffect(() => {
    if (auth) {
      setName(auth.user?.name || "");
      setEmail(auth.user?.email || "");
      setPhone(auth.user?.phone || "");
      setAddress(auth.user?.address || "");
    }
  }, [auth]);

  console.log("auth=", auth);
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/user/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          withCredentials: true,
        }
      );
      console.log("data = ", data);

      if (data?.success) {
        const newUser = data.user;

        const updatedUser = { ...auth, user: newUser };
        console.log("updated user = ", updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(login({ user: updatedUser }));
        toast.success("Profile Updated Successfully");
      } else {
        toast.error("Error while updating profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
