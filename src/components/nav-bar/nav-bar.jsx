import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import logo from '../../images/cinematix-logo.svg';
import { Link } from 'react-router-dom';

export const NavBar = ({ setUser, setToken, user }) => {
    return (
        <>
            <Navbar expand='lg' className='bg-primary'>
                <Container fluid>
                    <Navbar.Brand href=''>
                        <Image
                            src={logo}
                            alt='cinematix logo'
                            className='navbar--logo'
                        />
                        Cinematix
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav
                            className='justify-content-end'
                            style={{ width: '100%' }}
                        >
                            <Navbar.Text>
                                Profile:
                                <Link to='/users'>
                                    {!user ? 'No user' : user.username}
                                </Link>
                            </Navbar.Text>
                            <Nav.Link
                                href='#'
                                className='fw-bold'
                                onClick={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                }}
                            >
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
