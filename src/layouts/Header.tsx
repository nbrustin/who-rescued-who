import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Who Rescued Who?</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <>
    //   <div className="d-flex justify-content-center my-3 header">
    //     <h2>Who Rescued Who?</h2>
    //   </div>
    //   <div className="d-flex justify-content-center mb-3">
    //     <nav>
    //       <ul className="d-flex d-inline-flex">
    //         <li style={{ marginRight: "10px" }}>
    //           <Link to="/who-rescued-who">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/favorites">Favorites</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </>
  );
};

export default Header;
