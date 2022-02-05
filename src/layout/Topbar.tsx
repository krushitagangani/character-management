import React from "react";

// plugin import
import { Navbar, Container } from "react-bootstrap";

const Topbar = () => {
  return (
    <Navbar bg="dark" expand="lg" className="text-white">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand href="/" className="text-white">
          Movie DB - Starwars
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Topbar;
