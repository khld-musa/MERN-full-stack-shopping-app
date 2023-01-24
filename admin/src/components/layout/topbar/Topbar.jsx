import React from "react";
import "./topbar.css";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";

export default function Topbar() {


  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link
          className="topLeft"
          to="/dashboard"
        >
          <span className="logo">Dashboard</span>
        </Link>
        <div className="topRight">
          {user ? (
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>
                <Col className="col-auto media d-flex align-items-center">
                  <Image src={user.avatar && user.avatar.url} className="topAvatar" />
                </Col>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold">

                  <Link className="link-1"
                    to="/me"
                  >
                    <i class="fa-solid fa-user icon"></i>
                    <span className="mb-0 font-small fw-bold">{user && user.name}</span>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold">
                  <Link
                  className="link-1"
                    to="/"
                    onClick={logoutHandler}
                  >
                    <i class="fa fa-sign-out icon" aria-hidden="true"></i>
                    <span className="mb-0 font-small fw-bold">Logout</span>
                    
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            !loading && (

              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
