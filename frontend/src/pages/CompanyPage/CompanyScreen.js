import React, { useState } from "react";
import { connect } from "react-redux";

const CompanyScreen = ({ auth: { user } }) => {
    const [pageDetail, setPageDetail] = useState(false);

    return (
        <div style={{ marginTop: "8rem", textAlign: "center" }}>
            <h1>Welcome, {user && user.name}</h1>
            <div style={{ marginTop: "2rem" }}>
                <button
                    className="btn btn-primary"
                    onClick={() => setPageDetail(!pageDetail)}
                >
                    {pageDetail ? "Hide your details" : "Show your details"}
                </button>
            </div>
            {pageDetail && (
                <div style={{ marginTop: "1rem" }}>
                    <p>HERE IS COMPANY SCREEN</p>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(CompanyScreen);
