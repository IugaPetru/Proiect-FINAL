import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Despre() {
  return (
    <div className="factcont">
      <p className="aitem">
        <LocalPhoneIcon />
        Ne poți contacta apelând numărul de telefon: 0742815160
      </p>
      <p className="aitem">
        <LocationOnIcon /> Locatia noastra: Bulevardul Muncii, numarul 210
      </p>
    </div>
  );
}

export default Despre;
