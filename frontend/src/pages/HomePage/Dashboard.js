import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadProduct } from "../../redux/actions/product";
import { loadCompany } from "../../redux/actions/company";

const Dashboard = ({ user, companies, products, loadProduct, loadCompany }) => {
  const [userDetail, setUserDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    setIsLoading(false)
    loadProduct().then(() => loadCompany().then(() => isLoading(true)))
  }
  if (isLoading) {
    return <div className="App" style={styles.loading}>Loading...</div>;
  }
  return (
    <div style={{ marginTop: "8rem", textAlign: "center" }}>
      <h1><b>Welcome, {user && user.name}</b></h1><br />
      <h1>There are <b> {companies.length > 0 ? companies.length : 0} companies</b> in system,<br />
        last addded company is <b>{companies.length > 0 ? companies[companies.length - 1].companyName : "-"}</b></h1>
      <h1>There are <b>{products.length > 0 ? products.length : 0} products</b> in system,<br />
        last addded product is <b> {products.length > 0 ? products[products.length - 1].productName : "-"}</b></h1>
      <div style={{ marginTop: "2rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => setUserDetail(!userDetail)}
        >
          {userDetail ? "Hide your account details" : "Show your account details"}
        </button>
      </div>
      {userDetail && (
        <div style={{ marginTop: "1rem" }}>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
  companies: state.company.companies,
  products: state.product.products
});

export default connect(mapStateToProps, { loadProduct, loadCompany })(Dashboard);

const styles = {
  loading: { margin: "auto", width: "fit-content", marginTop: "12%", fontSize: 24, fontWeight:"bold" }
};
