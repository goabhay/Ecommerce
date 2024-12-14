import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "78vh" }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
