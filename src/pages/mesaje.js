import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./pages.css";
import { Modal, Button } from "react-bootstrap";

function Mesaje() {
  const [mesaj, setMesaj] = useState([]);
  const id = localStorage.getItem("username");
  const [lgShow, setLgShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const config1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:80/proiect_bloc/mesaje.php?", config1)
      .then((response) => response.json())
      .then((data) => setMesaj(data));
  }, []);
  return (
    <div className="factcont1">
      {mesaj.map((m) => (
        <Button
          key={m}
          className={lgShow ? "m_open" : "card_mesaj"}
          onClick={() => {
            setModalData(m.MESAJ);
            setLgShow(true);
          }}
        >
          <p className="card_text">{m.MESAJ}</p>
        </Button>
      ))}
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
        <Modal.Body>{modalData}</Modal.Body>
      </Modal>
    </div>
  );
}

export default Mesaje;
