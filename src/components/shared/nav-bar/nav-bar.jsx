import { Navbar, Nav, Container, Image, Form } from 'react-bootstrap';
import logo from '../../../assets/cinematix-logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthCtx } from '../../../context/auth-context';
import { useMoviesCtx } from '../../../context/movies-context';

export const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const { user, setUser, setToken } = useAuthCtx();
    const { searchMovies } = useMoviesCtx();

    const handleInput = (e) => {
        const userInput = e.target.value;
        setSearchInput(userInput);
        searchMovies(userInput);
    };

    const timeOfTheDay = (user) => {
        const date = new Date().getHours();
        return date >= 1 && date <= 12
            ? `Good morning, ${user}`
            : date >= 13 && date <= 20
            ? `Good afternoon, ${user}`
            : `Good night, ${user}`;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <>
            <Navbar
                expand='lg'
                className='navbar--container w-100'
                bg='dark'
                variant='dark'
            >
                <Container fluid>
                    <Navbar.Brand className='text-white'>
                        <Image
                            src={logo}
                            alt='cinematix logo'
                            className='navbar--logo'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav
                            className='justify-content-end'
                            style={{ width: '100%' }}
                        >
                            <Nav.Link
                                as={Link}
                                to={'/'}
                                className='fw-bold text-white'
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                onClick={logout}
                                className='fw-bold text-white'
                            >
                                Logout
                            </Nav.Link>
                            <Navbar.Text>
                                <Link
                                    to='/users'
                                    className='text-decoration-none text-white'
                                >
                                    Profile: {timeOfTheDay(user.username)}
                                    &nbsp;
                                </Link>
                            </Navbar.Text>
                        </Nav>
                        <Form className='d-flex'>
                            <Form.Label
                                htmlFor='searchInput'
                                className='d-none'
                            >
                                Search
                            </Form.Label>
                            <Form.Control
                                type='search'
                                placeholder='Search movies...'
                                className='me-2'
                                aria-label='Search'
                                value={searchInput}
                                onChange={handleInput}
                                id='searchInput'
                                name='searchInput'
                            />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
