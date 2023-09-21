import React, { useEffect, useState } from "react";
import "./pages.css";
import { Modal, Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import BoyRoundedIcon from "@mui/icons-material/BoyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import AddIcon from "@mui/icons-material/Add";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import Table from "react-bootstrap/Table";

const Cont = () => {
  const [items, setItems] = useState([]);
  const id = localStorage.getItem("username");
  const [modif, setModif] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [lgShow, setLgShow] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
  };
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

  const sterge = (id) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:80/proiect_bloc/sterge.php", config).then(() => {
      setModif(!modif);
      if (modif === false) {
        alert("Contul a fost sters cu succes");

        navigate("/componente/login");
      } else {
        alert("Contul nu a putut fi sters");
      }
    });
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    formData.append("id", id);
    const config = {
      method: "POST",

      body: formData,
    };

    fetch("http://localhost:80/proiect_bloc/upload.php", config)
      .then((response) => response.text())
      .then((data) => {
        if (data === "Fișier încărcat și inserat în baza de date.") {
          alert("Eroare la inserarea fișierului în baza de date.");
        } else {
          alert("Fișier încărcat și inserat în baza de date.");
        }
        event.target.reset();
      });
  };

  return (
    <div className={lgShow ? "factcont_hide" : "factcont"}>
      Detalii cont
      <Table className="tab">
        <thead>
          {items.length > 0 &&
            items.map((item) => (
              <tr key={item.ID}>
                <th>Utilizator Conectat:</th>
                <th>{item.NUME}</th>
              </tr>
            ))}
        </thead>

        {items.length > 0 &&
          items.map((item) => (
            <tbody key={item.ID}>
              <tr>
                <tr>
                  <td>
                    <BoyRoundedIcon />
                  </td>
                  <td> Nume si Prenume utilizator:</td>
                </tr>
                <td>
                  {item.NUME} {item.PRENUME}
                </td>
              </tr>
              <tr>
                <tr>
                  <td>
                    <EmailRoundedIcon />
                  </td>
                  <td>Email</td>
                </tr>
                <td>{item.EMAIL}</td>
              </tr>
              <tr>
                <tr>
                  <td>
                    <TopicRoundedIcon />
                  </td>
                  <td>Adauga acte</td>
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
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <input
                          type="file"
                          name="pdf_file"
                          onChange={handleFileChange}
                        />

                        <button type="submit">Upload</button>
                      </form>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
              <tr>
                <tr>
                  <td>
                    <KeyRoundedIcon />
                  </td>
                  <td>Schimba Parola</td>
                </tr>
                <td>
                  <Button
                    type="submit"
                    className="schimba"
                    onClick={() => navigate("/componente/parola")}
                  >
                    <SettingsSuggestIcon />
                    Modifica
                  </Button>
                </td>
              </tr>

              <tr>
                <tr>
                  <td>
                    <DeleteRoundedIcon />
                  </td>
                  <td>Sterge cont</td>
                </tr>
                <td>
                  <Button
                    type="submit"
                    className="sterge"
                    onClick={() => {
                      sterge(id);

                      logout();
                    }}
                  >
                    <DeleteIcon />
                    Sterge
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};
export default Cont;
