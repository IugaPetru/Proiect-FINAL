import React from "react";
import Form from "react-bootstrap/Form";
import "./login.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PublicIcon from "@mui/icons-material/Public";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavLogReg from "./Nav-log_reg";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  let history = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    parola: "",
    nume: "",
    prenume: "",
    CNP: "",
    telefon: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const rdata = {
      username: data.username,
      parola: data.parola,
      nume: data.nume,
      prenume: data.prenume,
      CNP: data.CNP,
      email: data.email,
      telefon: data.telefon,
      nr_apartament: data.nr_apartament,
      judet: data.judet,
      localitate: data.localitate,
      strada: data.strada,
      numar: data.numar,
      bloc: data.bloc,
      scara: data.scara,
      etaj: data.etaj,
    };
    if (
      data.username === "" ||
      data.parola === "" ||
      data.nume === "" ||
      data.prenume === "" ||
      data.CNP === "" ||
      data.email === "" ||
      data.telefon === "" ||
      data.nr_apartament === "" ||
      data.judet === "" ||
      data.localitate === "" ||
      data.strada === "" ||
      data.numar === "" ||
      data.bloc === "" ||
      data.scara === "" ||
      data.etaj === ""
    ) {
      alert("Va rugam sa completati toate campurile!");
    } else {
      axios
        .post("http://localhost:80/proiect_bloc/register.php", rdata)

        .then((result) => {
          console.log(result);
          if (result.data.Status === "Invalid") {
            alert("Invalid user");
          } else {
            alert("Inregistrare reusita. Acuma va puteti loga");
            history("/componente/login");
          }
        });
    }
  };
  return (
    <div className="nav_reg">
      <NavLogReg />
      <Form onSubmit={submitForm} className="stil">
        <Form.Group as={Row} className="register">
          <Form.Label column className="item">
            Email
          </Form.Label>
          <Col className="coloana">
            <MailOutlineIcon />
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </Col>
          <Form.Label column className="item">
            Username
          </Form.Label>
          <Col className="coloana">
            <AccountBoxIcon />
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
          </Col>
          <Form.Label column className="item">
            Parola
          </Form.Label>
          <Col className="coloana">
            <KeyIcon />
            <Form.Control
              type="password"
              name="parola"
              placeholder="Parola"
              onChange={handleChange}
              value={data.parola}
            />
          </Col>

          <Form.Label column className="item">
            Nume
          </Form.Label>
          <Col className="coloana">
            <PersonIcon />
            <Form.Control
              type="text"
              name="nume"
              placeholder="Nume"
              onChange={handleChange}
              value={data.nume}
            />
          </Col>
          <Form.Label column className="item">
            Prenume
          </Form.Label>
          <Col className="coloana">
            <PersonIcon />
            <Form.Control
              type="text"
              name="prenume"
              placeholder="Prenume"
              onChange={handleChange}
              value={data.prenume}
            />
          </Col>
          <Form.Label column className="item">
            CNP
          </Form.Label>
          <Col className="coloana">
            <LockIcon />
            <Form.Control
              type="text"
              name="CNP"
              placeholder="CNP"
              onChange={handleChange}
              value={data.CNP}
            />
          </Col>
          <Form.Label column className="item">
            Telefon
          </Form.Label>
          <Col className="coloana">
            <LocalPhoneIcon />
            <Form.Control
              type="text"
              name="telefon"
              placeholder="Telefon"
              onChange={handleChange}
              value={data.telefon}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="detali">
          <Form.Label column className="item">
            Numar apartament
          </Form.Label>
          <Col className="coloana">
            <ApartmentIcon />
            <Form.Control
              type="text"
              placeholder="Numar apartament"
              name="nr_apartament"
              onChange={handleChange}
              value={data.nr_apartament}
            />
          </Col>

          <Form.Label column className="item">
            Judet
          </Form.Label>
          <Col className="coloana">
            <PublicIcon />
            <Form.Control
              type="text"
              placeholder="Judet"
              name="judet"
              onChange={handleChange}
              value={data.judet}
            />
          </Col>

          <Form.Label column className="item">
            Localitate
          </Form.Label>
          <Col className="coloana">
            <PublicIcon />
            <Form.Control
              type="text"
              placeholder="Localitate"
              name="localitate"
              onChange={handleChange}
              value={data.localitate}
            />
          </Col>

          <Form.Label column className="item">
            Strada
          </Form.Label>
          <Col className="coloana">
            <AddLocationIcon />
            <Form.Control
              type="text"
              placeholder="Strada"
              name="strada"
              onChange={handleChange}
              value={data.strada}
            />
          </Col>

          <Form.Label column className="item">
            Numar
          </Form.Label>
          <Col className="coloana">
            <AddLocationIcon />
            <Form.Control
              type="text"
              placeholder="Numar"
              name="numar"
              onChange={handleChange}
              value={data.numar}
            />
          </Col>
          <Form.Label column className="item">
            Bloc
          </Form.Label>
          <Col className="coloana">
            <AddLocationIcon />
            <Form.Control
              type="text"
              placeholder="Bloc"
              name="bloc"
              onChange={handleChange}
              value={data.bloc}
            />
          </Col>
          <Form.Label column className="item">
            Scara
          </Form.Label>
          <Col className="coloana">
            <AddLocationIcon />
            <Form.Control
              type="text"
              placeholder="Scara"
              name="scara"
              onChange={handleChange}
              value={data.scara}
            />
          </Col>
          <Form.Label column className="item">
            Etaj
          </Form.Label>
          <Col className="coloana">
            <AddLocationIcon />
            <Form.Control
              type="text"
              placeholder="Etaj"
              name="etaj"
              onChange={handleChange}
              value={data.etaj}
            />
          </Col>
        </Form.Group>

        <Button type="submit" className="btn1">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Register;
