import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    let auth;
    let dashboard;
    let contacts;
    if (localStorage.getItem("jwt") == null) {
      auth = <Nav.Link href="/login">Login</Nav.Link>;
    } else {
      auth = <Nav.Link href="/logout">Logout</Nav.Link>;
      dashboard = <Nav.Link href="/dashboard">Dashboard</Nav.Link>;
      contacts = <Nav.Link href="/contacts">Contacts</Nav.Link>;
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">Job Seeker</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              {dashboard}
              {contacts}
              {auth}
            </Nav>
          </Container>
        </Navbar>
        {/* <nav>
          <ul>
            <li>
              <Nav.Link exact activeClassName="current" to="/">
                Home
              </Nav.Link>
            </li>
            <li>
              <Nav.Link exact activeClassName="current" to="/about">
                About
              </Nav.Link>
            </li>
            {dashboard}
            {contacts}
            {auth}
          </ul>
        </nav> */}
      </div>
    );
  }
}

export default Navigation;
