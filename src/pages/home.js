import React from "react";

import Card from "react-bootstrap/Card";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CardGroup from "react-bootstrap/CardGroup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <CardGroup className="cardgroup">
        <Card className="cardh">
          <Link color="primary" to={"/facturi"}>
            <Card.Body>
              <InsertDriveFileIcon color="action" sx={{ fontSize: 60 }} />
              <Card.Text className="cardtext">Facturi</Card.Text>
            </Card.Body>
          </Link>
        </Card>

        <Card className="cardh">
          <Link to={"/cont"}>
            <Card.Body>
              <HowToRegIcon color="action" sx={{ fontSize: 60 }} />
              <Card.Text className="cardtext">Cont</Card.Text>
            </Card.Body>
          </Link>
        </Card>

        <Card className="cardh">
          <Link to={"/index"}>
            <Card.Body>
              <ContentPasteIcon color="action" sx={{ fontSize: 60 }} />
              <Card.Text className="cardtext">Index</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </CardGroup>
      <CardGroup className="cardgroup">
        <Card className="cardh">
          <Link to={"/mesaje"}>
            <MailOutlineIcon color="action" sx={{ fontSize: 60 }} />
            <Card.Body>
              <Card.Text className="cardtext">Mesaje</Card.Text>
            </Card.Body>
          </Link>
        </Card>
        <Card className="cardh">
          <Link to={"/noutati"}>
            <Card.Body>
              <InsertDriveFileIcon color="action" sx={{ fontSize: 60 }} />
              <Card.Text className="cardtext">Noutati</Card.Text>
            </Card.Body>
          </Link>
        </Card>
        <Card className="cardh">
          <Link to={"/despre"}>
            <Card.Body>
              <InfoIcon color="action" sx={{ fontSize: 60 }} />
              <Card.Text className="cardtext">Contact</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </CardGroup>
    </>
  );
}

export default Home;
