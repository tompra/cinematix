import { Navbar, Nav, NavDropdown } from "react-bootstrap"
export const NavBar = ({setUser, setToken}) => {
    return(
    <Navbar expand="lg" className="bg-body-tertiary">
       <Container fluid>
        <Navbar.Brand href="#home">Cinematix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="#" onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    )
}