import { Navbar, Nav, Container } from "react-bootstrap"
export const NavBar = ({setUser, setToken}) => {
    return(
       
    <Navbar expand="lg" className="bg-body-tertiary">
       <Container fluid>
        <Navbar.Brand href="#home">Cinematix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#logout" className="ml-auto" onClick={() => {
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