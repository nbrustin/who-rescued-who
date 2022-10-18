import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FormCheck from "react-bootstrap/FormCheck";
import "./Header.css";

const Header = ({
  toggleTheme,
  darkTheme,
}: {
  toggleTheme: () => void;
  darkTheme: boolean;
}) => {
  return (
    <Navbar style={{ color: darkTheme ? "#dba9c7" : "#c52184" }} expand="lg">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/who-rescued-who"
          style={{ color: darkTheme ? "#dba9c7" : "#c52184" }}
          className="brand"
        >
          Who Rescued Who?
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link
              as={Link}
              to="/favorites"
              style={{
                color: darkTheme ? "#dba9c7" : "#c52184",
                fontWeight: "700",
              }}
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <FormCheck
          id="darkMode"
          className="ml-10"
          type="switch"
          checked={darkTheme}
          onClick={toggleTheme}
          label="Dark Mode"
        ></FormCheck>
      </Container>
    </Navbar>
  );
};

export default Header;
