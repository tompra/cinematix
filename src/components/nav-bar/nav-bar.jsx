import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import logo from '../../images/cinematix-logo.svg';
import { Link } from 'react-router-dom';

export const NavBar = ({ setUser, setToken, user }) => {
    return (
        <>
            <Navbar expand='lg' className='bg-primary navbar-with-shadow'>
                <Container fluid>
                    <Navbar.Brand href='' className='text-light'>
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
                            <Nav.Link as={Link} to={'/'} className='text-light'>
                                Home
                            </Nav.Link>
                            <Navbar.Text className='text-light'>
                                Profile: &nbsp;
                                <Link to='/users' className='text-light'>
                                    {!user ? 'No user' : user.username}
                                </Link>
                            </Navbar.Text>
                            <Nav.Link
                                as={Link}
                                className='fw-bold text-light'
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
