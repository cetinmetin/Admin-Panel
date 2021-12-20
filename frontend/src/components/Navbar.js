import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/dashboard" style={styles.navbarItems}>
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm" >Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/product" style={styles.navbarItems}>
          <i className="fab fa-accusoft"></i>{" "}
          <span className="hide-sm">Products</span>
        </Link>
      </li>
      <li>
        <Link to="/company" style={styles.navbarItems}>
          <i className="fas fa-building"></i>{" "}
          <span className="hide-sm">Companies</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/" replace style={styles.navbarItems}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm"> &nbsp;Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/register" style={styles.navbarItems}>Register</Link>
      </li>
      <li>
        <Link to="/login" style={styles.navbarItems}>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/" style={styles.navbarItems}>HOME</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

const styles = {
  navbarItems: { textDecoration: "none" },
};
