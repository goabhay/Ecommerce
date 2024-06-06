import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Spinner({ path = "login" }) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate(`/${path}`, {
            state: location.pathname,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, location, path]);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column align-items-center">
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">
          <h1>Redirecting in {count} sec</h1>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
