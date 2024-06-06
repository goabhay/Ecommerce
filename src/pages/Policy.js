import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Ecommerce Privacy-Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <ul>
            <li>No item shall be returned after 20 days from delivery date.</li>
            <li>Customer can complain about the delivery person.</li>
            <li>
              If customer is no satisfied with the delivered product he can file
              complain.
            </li>
            <li>Goods purchased are not for selling purpose</li>
            <li>No cheque is accepted.</li>
            <li>Cusotmer may withdraw from his order.</li>
            <li>Cupon won by user shall not be entertained oncce expired.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
