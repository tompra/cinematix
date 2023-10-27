import { Navbar, Nav, Container } from "react-bootstrap"
export const NavBar = ({setUser, setToken, user}) => {
    return(
    <div>
        <Navbar expand="lg" className="bg-primary">
          <Container fluid>
            <Navbar.Brand href="#home">Cinematix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                 <Navbar.Text>
                    Signed in as: <a href="#login">{user.username}</a>
                </Navbar.Text>
                <Nav.Link href="#" className="fw-bold" onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
    )
}