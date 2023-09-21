import React, { useState, useEffect } from "react";
import "./pages.css";
import Table from "react-bootstrap/Table";

const Incarcafact = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [incar, setIncar] = useState([]);
  const [sumaVal, setSumVal] = useState("");

  useEffect(() => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:80/proiect_bloc/factap.php", config)
      .then((response) => response.json())
      .then((data) => setIncar(data));
  }, []);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleInputChange = (event) => {
    setSumVal(event.target.value);
  };

  const handleSubmit = async (event, id_apartament, strada, bloc, numar) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    formData.append("id_apartament", id_apartament);
    formData.append("strada", strada);
    formData.append("bloc", bloc);
    formData.append("numar", numar);
    formData.append("sumaVal", sumaVal);

    fetch("http://localhost:80/proiect_bloc/factura.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Fișier încărcat și inserat în baza de date.") {
          alert("Eroare la inserarea fișierului în baza de date.");
        } else {
          alert("Fișier încărcat și inserat în baza de date.");
        }
        event.target.reset();
        setSumVal("");
      });
  };

  return (
    <div className="factcont1">
      <Table className="tab">
        <thead>
          <tr>
            <th>Nume Proprietar</th>
            <th>Prenume Proprietar</th>
            <th>Numar apartament</th>
            <th>
              Factura +{" "}
              <input
                type="text"
                value={sumaVal}
                placeholder="Suma de plata"
                onChange={handleInputChange}
              />{" "}
            </th>
          </tr>
        </thead>

        {incar.length > 0 &&
          incar.map((it) => (
            <tbody key={it.ID}>
              <tr>
                <td>{it.NUME}</td>

                <td>{it.PRENUME}</td>
                <td>{it.NUMAR_APARTAMENT}</td>
                <td>
                  <form
                    onSubmit={(event) =>
                      handleSubmit(
                        event,
                        it.ID_APARTAMENT,
                        it.STRADA,
                        it.BLOC,
                        it.NUMAR
                      )
                    }
                    encType="multipart/form-data"
                    className="form_m"
                  >
                    <input
                      type="file"
                      name="pdf_file"
                      onChange={(event) =>
                        handleFileChange(
                          event,
                          it.ID_APARTAMENT,
                          it.STRADA,
                          it.BLOC,
                          it.NUMAR
                        )
                      }
                    />

                    <button type="submit">Upload</button>
                  </form>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};
export default Incarcafact;
