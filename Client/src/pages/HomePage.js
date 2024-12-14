import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { setCart } from "../store/cartSlice";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define state
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  // useEffect hook to fetch user data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsedData = JSON.parse(data);
      dispatch(login({ user: parsedData.user, token: parsedData.token }));
    }
  }, [dispatch]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/get-category`,
        {
          withCredentials: true,
        }
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/get-product`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-count`,
        {
          withCredentials: true,
        }
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-list/${page}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/product/product-filters`,
        {
          checked,
          radio,
        },
        {
          withCredentials: true,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <div key={c._id}>
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column mb-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"350px"}
                  width={"250px"}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      dispatch(setCart(p));
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
