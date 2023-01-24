import React, { useState, Fragment } from "react";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import Search from "./Search";

import "../../App.css";
import "./layout.css";

const Header = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <nav className="nav ">
        <div className="nav__brand">
          <Link to="/">
            <i class="nav__brand fa fa-home" aria-hidden="true"></i>
            {/* <img src="/images/shopit_logo.png" /> */}
          </Link>
        </div>
        <div className="col-6">
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        {user ? (
          <ul className={active}>
            <li className="nav__item">
              <Link to="#!" className="nav__link">
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__link"
                to="/cart"
                style={{ textDecoration: "none" }}
              >
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                <span className="ml-1" id="cart_count">
                  {cartItems.length}
                </span>
              </Link>
            </li>

       
            <li className="nav__item">
              <Link className="nav__link" to="/orders/me">
                <i class="fa fa-first-order" aria-hidden="true"></i>
                <span className="profile">orders</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/me">
            <i class="fa fa-user" aria-hidden="true"></i>
            <span className="profile">Profile</span>
                
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__link text-warning"
                to="/"
                onClick={logoutHandler}
              >
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          !loading && (
            <Link to="/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          )
        )}
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
