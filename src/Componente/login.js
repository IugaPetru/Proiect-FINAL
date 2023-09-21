import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./login.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavLogReg from "./Nav-log_reg";
import Button from "react-bootstrap/Button";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nav } from "react-bootstrap";

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({ username: "", parola: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const luser = {
      username: user.username,
      parola: user.parola,
    };

    axios
      .post("http://localhost:80/proiect_bloc/login.php", luser)
      .then((result) => {
        console.log(result);
        if (result.data !== "not ok") {
          window.localStorage.setItem("username", result.data);

          navigate("/home");
        } else {
          alert("Parola sau Username gresit");

          navigate("/componente/login");
        }
      });
    axios
      .post("http://localhost:80/proiect_bloc/username.php", luser)
      .then((result) => {
        console.log(result);
        if (result.data !== "not ok") {
          window.localStorage.setItem("user", result.data);
        }
      });
  };

  return (
    <div className="nav_login">
      <NavLogReg />
      <Form className="stil_log" onSubmit={submitForm}>
        <Form.Group as={Row} className="register_log">
          <Form.Label className="item">Username</Form.Label>
          <Col className="coloana">
            <AccountBoxIcon />
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={user.username}
            />
          </Col>
          <Form.Label className="item">Parola</Form.Label>
          <Col className="coloana">
            <MailOutlineIcon />
            <Form.Control
              type="password"
              placeholder="Parola"
              name="parola"
              onChange={handleChange}
              value={user.parola}
            />
          </Col>
          <Button type="submit" className="btn_login">
            <Nav href="/home">Login</Nav>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
export default Login;
