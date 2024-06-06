import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner.js";

function Private() {
  const [ok, setOk] = useState(false);
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null; // Handling null or undefined token

  useEffect(() => {
    const authCheck = async () => {
      if (!token) {
        setOk(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/user/user-auth`,
          {
            withCredentials: true,
          }
        );

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setOk(false);
      }
    };

    if (token) authCheck();
    else setOk(false);
  }, [token]);

  return ok ? <Outlet /> : <Spinner />;
}

export default Private;
