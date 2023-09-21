import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import AddIcon from "@mui/icons-material/Add";

function Noutati() {
  const [noutati, setNoutati] = useState([]);

  useEffect(() => {
    const configit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:80/proiect_bloc/noutati.php", configit)
      .then((response) => response.json())
      .then((data) => setNoutati(data));
  }, []);

  return (
    <div className="factcont1">
      {noutati.map((n) => (
        <Accordion key={n.ID} className="drop" defaultActiveKey="0">
          <Accordion.Item className="aitem">
            <Accordion.Header className="open">
              <AddIcon />
            </Accordion.Header>
            <Accordion.Body>{n.CONTINUT}</Accordion.Body>
          </Accordion.Item>{" "}
        </Accordion>
      ))}
    </div>
  );
}

export default Noutati;
