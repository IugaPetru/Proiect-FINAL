import React, { useEffect, useState } from "react";
import "./pages.css";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import BoyRoundedIcon from "@mui/icons-material/BoyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Table from "react-bootstrap/Table";

const Index = () => {
  const [items, setItems] = useState([]);
  const [auto, setAuto] = useState([]);
  const id = localStorage.getItem("username");
  const [citire, setCitire] = useState({ autocitire: "" });
  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:80/proiect_bloc/cont.php", config)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);
  useEffect(() => {
    const config2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:80/proiect_bloc/indexafisare.php", config2)
      .then((response) => response.json())
      .then((data) => {
        setAuto(data);
        window.localStorage.setItem("ID_APARTAMENT", data[0].ID_APARTAMENT);
      });
  }, []);

  const handleChange = (e) => {
    setCitire({ autocitire: e.target.value });
  };
  const id_apartament = localStorage.getItem("ID_APARTAMENT");
  const submitForm = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_ap: id_apartament,
        autocitire: citire.autocitire,
      }),
    };

    if (citire === "") {
      alert("Nu ati introdus nici o valoare pentru index");
    } else {
      fetch("http://localhost:80/proiect_bloc/index.php", config)
        .then((response) => response.json())
        .then((data) => {
          if (data === "ok") {
            alert("Indexul autocitit a fost transmis cu succes");
          }
        });
    }
  };

  return (
    <div className={lgShow ? "factcont_hide" : "factcont"}>
      Detalii cont
      <Table className="tab">
        <thead>
          {items.length > 0 &&
            items.map((item) => (
              <tr key={item.ID}>
                <th>
                  Buna ziua {item.NUME} {item.PRENUME}
                </th>
              </tr>
            ))}
        </thead>

        <tbody>
          {auto.length > 0 &&
            auto.map((au) => (
              <tr key={au.ID}>
                <tr>
                  <td>
                    <BoyRoundedIcon />
                  </td>
                  <td> Index estimat conform ultimei facturi</td>
                </tr>
                <td>{au.ESTIMARE ? "" : au.AUTOCITIRE}</td>
              </tr>
            ))}
          {auto.length > 0 &&
            auto.map((au) => (
              <tr key={au.ID}>
                <tr>
                  <td>
                    <EmailRoundedIcon />
                  </td>
                  <td>Ultimul index autocitit</td>
                </tr>
                <td>{au.AUTOCITIRE}</td>
              </tr>
            ))}

          <tr>
            <tr>
              <td>
                <TopicRoundedIcon />
              </td>
              <td>Adauga index autocitit</td>
            </tr>
            <td>
              <Button className="incarca" onClick={() => setLgShow(true)}>
                <AddIcon /> Adauga
              </Button>
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                className="modal-backdrop"
              >
                <Modal.Header>
                  <CancelIcon
                    onClick={() => {
                      setLgShow(false);
                    }}
                  />
                </Modal.Header>
                <Modal.Body>
                  <Form className="stil_log" onSubmit={submitForm}>
                    <Form.Group>
                      <Form.Label className="item">Index autocitit</Form.Label>
                      <Col className="coloana">
                        <Form.Control
                          type="text"
                          name="username"
                          onChange={handleChange}
                          value={citire.autocitire}
                        />
                      </Col>
                      <Button type="submit">Trimite</Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
              </Modal>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default Index;
