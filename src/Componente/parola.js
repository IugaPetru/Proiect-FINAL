import React from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import axios from "axios";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ElderlyWomanSharpIcon from "@mui/icons-material/ElderlyWomanSharp";
import BabyChangingStationSharpIcon from "@mui/icons-material/BabyChangingStationSharp";

function Parola() {
  let navigate = useNavigate();
  const [user, setUser] = useState({ parolaveche: "", parolanoua: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const luser = {
      parolaveche: user.parolaveche,
      parolanoua: user.parolanoua,
    };

    if (user.parolaveche === "" || user.parolanoua === "") {
      alert("Va rugam completati toate campurile");
    } else {
      axios
        .post("http://localhost:80/proiect_bloc/editp.php", luser)

        .then((result) => {
          console.log(result);
          if (result.data !== "not ok") {
            alert("Parola a fost schimbata cu succes");
            localStorage.removeItem("user");
            localStorage.removeItem("username");
            navigate("/componente/login");
          } else {
            alert("Parola prea slaba");
          }
        });
    }
  };
  return (
    <div className="nav_login">
      <Form className="paslog" onSubmit={submitForm}>
        <Form.Group as={Row} className="register_log">
          <Form.Label className="item">
            <ElderlyWomanSharpIcon fontSize={"large"} />
            Parola Veche
          </Form.Label>
          <Col className="coloanap">
            <Form.Control
              type="password"
              name="parolaveche"
              placeholder="Parola veche"
              onChange={handleChange}
              value={user.parolaveche}
            />
          </Col>
          <Form.Label className="item">
            <BabyChangingStationSharpIcon fontSize={"large"} />
            Parola Noua
          </Form.Label>
          <Col className="coloanap">
            <Form.Control
              type="password"
              placeholder="Parola Noua"
              name="parolanoua"
              onChange={handleChange}
              value={user.parolanoua}
            />
          </Col>
          <Button type="submit" className="slogin">
            <Nav href="/home">Schimba</Nav>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
export default Parola;
