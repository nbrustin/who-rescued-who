import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

const Header = ({
  toggleTheme,
  darkTheme,
}: {
  toggleTheme: () => void;
  darkTheme: boolean;
}) => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/who-rescued-who" className="brand">
          Who Rescued Who?
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link
              as={Link}
              to="/favorites"
              className="brandColor"
              style={{ fontWeight: "700" }}
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <button onClick={toggleTheme}>
          {darkTheme ? "Enable light theme" : "Enable dark theme"}
        </button>
      </Container>
    </Navbar>
  );
};

export default Header;
