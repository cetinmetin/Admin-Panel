import React, { useState } from "react";
import { connect } from "react-redux";

const Dashboard = ({ auth: { user } }) => {
  const [userDetail, setUserDetail] = useState(false);

  return (
    <div style={{ marginTop: "8rem", textAlign: "center" }}>
      <h1>Welcome, {user && user.name}</h1>
      <div style={{ marginTop: "2rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => setUserDetail(!userDetail)}
        >
          {userDetail ? "Hide your details" : "Show your details"}
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
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
