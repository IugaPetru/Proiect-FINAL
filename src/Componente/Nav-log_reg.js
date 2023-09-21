import React from "react";
import "./login.css";
import { Nav, Navbar, NavLink } from "react-bootstrap";

function NavLogReg() {
  return (
    <Navbar className="log_nav">
      <Nav className="nav_l">
        <NavLink
          className={
            window.location.pathname.includes("login")
              ? "t_link active"
              : "t_link"
          }
          href="/componente/login"
        >
          {" "}
          Login
        </NavLink>
        <NavLink
          className={
            window.location.pathname.includes("register")
              ? "t_link active"
              : "t_link"
          }
          href="/componente/register"
        >
          {" "}
          Register
        </NavLink>
      </Nav>
    </Navbar>
  );
}

export default NavLogReg;
