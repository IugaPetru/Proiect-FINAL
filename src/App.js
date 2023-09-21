import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Componente/login";
import MenuIcon from "@mui/icons-material/Menu";
import Despre from "./pages/despre";
import Facturi from "./pages/facturi";
import Home from "./pages/home";
import Mesaje from "./pages/mesaje";
import Cont from "./pages/cont";
import { Container, Nav, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import HouseIcon from "@mui/icons-material/House";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Noutati from "./pages/noutati";

import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Register from "./Componente/register";
import Parola from "./Componente/parola";

import Incarcafact from "./pages/Incarcarefact";
import Index from "./pages";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const user = localStorage.getItem("user");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
  };

  const veruser = user !== null ? user : "Login";

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <Container style={{ display: "inline" }}>
      <Stack className="top_nav" direction="row" spacing={2}>
        <div className="top_link">
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <HowToRegIcon
              className={user !== null ? "top_button2" : "top_button1"}
              sx={{ fontSize: 30 }}
            />
            <p>{veruser}</p>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <Nav.Link href="/cont">
                          <HowToRegIcon className="submenu" />
                          Detalii cont
                        </Nav.Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Nav.Link href="/componente/login">
                          <LoginIcon className="submenu" />
                          Login
                        </Nav.Link>
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        <Nav.Link href="/componente/login">
                          <LogoutIcon className="submenu" />
                          Logout
                        </Nav.Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
      <Container>
        <Navbar
          style={{ width: isOpen ? "200px" : "40px" }}
          className="sidenav"
        >
          <Nav>
            {isOpen ? (
              <MenuIcon
                className="toog"
                sx={{ fontSize: 30 }}
                onClick={toggle}
              />
            ) : (
              <ArrowForwardIosIcon
                className="toog"
                onClick={toggle}
                sx={{ fontSize: 30 }}
              />
            )}

            <ul>
              <li>
                <Nav.Link className="link" href="/home">
                  <HouseIcon sx={{ fontSize: 30 }} />
                  <p style={{ display: isOpen ? "block" : "none" }}> Acasa</p>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="link" href="/facturi">
                  <InventoryIcon sx={{ fontSize: 30 }} />
                  <p style={{ display: isOpen ? "block" : "none" }}>Facturi</p>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="link" href="/mesaje">
                  <MailOutlineIcon sx={{ fontSize: 30 }} />
                  <p style={{ display: isOpen ? "block" : "none" }}>Mesaje</p>
                </Nav.Link>
              </li>
              <ul
                style={{
                  display:
                    localStorage.getItem("username") == "32" ? "block" : "none",
                }}
              >
                <li>
                  <Nav.Link href="/incarcarefact" className="link">
                    <ApartmentIcon sx={{ fontSize: 30 }} />
                    <p style={{ display: isOpen ? "block" : "none" }}>
                      Incarca Facturi
                    </p>
                  </Nav.Link>
                </li>
              </ul>
            </ul>
          </Nav>
        </Navbar>
        <main>
          <Routes>
            <Route
              path="/"
              element={<h1 className="text-center"> Bun venit!</h1>}
            />
            <Route path="/componente/parola" element={<Parola />} />
            <Route path="/componente/login" element={<Login />} />
            <Route path="/componente/register" element={<Register />} />
            <Route path="/index" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/facturi" element={<Facturi />} />
            <Route path="/cont" element={<Cont />} />
            <Route path="/mesaje" element={<Mesaje />} />
            <Route path="/noutati" element={<Noutati />} />
            <Route path="/despre" element={<Despre />} />
            <Route path="/incarcarefact" element={<Incarcafact />} />
          </Routes>
        </main>
      </Container>
    </Container>
  );
}

export default App;
