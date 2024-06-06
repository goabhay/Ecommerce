import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiShoppingBag4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const categories = useCategory();
  const cartItemCnt = useSelector((state) => state.cartReducer);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setToken(parsed.token);
      setUser(parsed.user);
    }
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Logout successfully");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand">
              <RiShoppingBag4Line /> E-commerce App
            </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {token === "" ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li key="dashboard">
                      <NavLink
                        className="dropdown-item"
                        to={`/dashboard/${user?.role === 1 ? "admin" : "user"}`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li key="logout">
                      <NavLink
                        className="dropdown-item"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart ({cartItemCnt.length || 0})
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
