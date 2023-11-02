import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import logo from '../../images/cinematix-logo.svg';
import { Link } from 'react-router-dom';

const timeOfTheDay = (user) => {
    const date = new Date().getHours();
    return date >= 1 && date <= 12
        ? `Good morning, ${user}`
        : date >= 13 && date <= 20
        ? `Good afternoon, ${user}`
        : `Good night, ${user}`;
};

export const NavBar = ({ setUser, setToken, user }) => {
    return (
        <>
            <Navbar expand='lg' className='navbar--container'>
                <Container fluid>
                    <Navbar.Brand>
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
                            <Nav.Link as={Link} to={'/'} className='fw-bold'>
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                onClick={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                }}
                                className='fw-bold'
                            >
                                Logout &nbsp;
                            </Nav.Link>
                            <Navbar.Text>
                                <Link
                                    to='/users'
                                    className='text-decoration-none'
                                >
                                    {timeOfTheDay(user.username)} &nbsp;
                                </Link>
                            </Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
