import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer bg-dark text-light p-3footer  p-3">
      <h5 className="text-center">All Rights Reserved @ Ecommerce</h5>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer;
