import React, { useEffect, useState } from "react";
import "./pages.css";
import Table from "react-bootstrap/Table";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const Facturi = () => {
  const [item, setItem] = useState([]);
  const id = localStorage.getItem("username");

  useEffect(() => {
    const configit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:80/proiect_bloc/facturi.php", configit)
      .then((response) => response.json())
      .then((data) => setItem(data));
  }, []);

  const handleDownload = (itemId) => {
    fetch(`"http://localhost:80/proiect_bloc/factura.php?id=${itemId}"`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const downloadButton = document.createElement("a");
        downloadButton.href = url;
        downloadButton.download = "file.pdf";
        downloadButton.textContent = "Download PDF";
        document.body.appendChild(downloadButton);
        downloadButton.click();
        document.body.removeChild(downloadButton);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="factcont">
      <Table className="tab">
        <thead>
          <tr>
            <th>Emitere</th>
            <th>Scadenta</th>
            <th>Suma</th>
            <th>Stare</th>
            <th>Detalii</th>
            <th>Descarca</th>
          </tr>
        </thead>
        <tbody>
          {item?.length > 0 &&
            item.map((ite) => (
              <tr key={ite.ID} className="row1">
                <td>{ite.EMITERE}</td>
                <td>{ite.SCADENTA}</td>
                <td>{ite.SUMA} lei</td>
                <td
                  className={
                    ite.STARE === "Achitata" ? "greenclass" : "redclass"
                  }
                >
                  {ite.STARE}
                </td>

                <td>{ite.DETALII}</td>
                <td>
                  <CloudDownloadIcon
                    onClick={() => handleDownload(ite.ID_FACTURA)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Facturi;
