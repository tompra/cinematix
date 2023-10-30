import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignIn } from '../sign-in-view/sign-in-view';
import { Row, Col, Button } from 'react-bootstrap';
import { NavBar } from '../nav-bar/nav-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [isLoginView, setLoginView] = useState(true);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch('https://popcornhub-api.onrender.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromAPI = data.map((movie, index) => {
                    return {
                        id: index + 1,
                        title: movie.title,
                        description: movie.description,
                        director: {
                            name: movie.director.name,
                            bio: movie.director.bio,
                            birth: movie.director.birth,
                            death: movie.director.death,
                        },
                        genre: {
                            name: movie.genre.name,
                            description: movie.genre.description,
                        },
                        image: movie.imageUrl,
                        actors: movie.actors,
                        featured: movie.featured,
                    };
                });
                setMovies(moviesFromAPI);
            })
            .catch((err) => console.error(err));
    }, [token]);

    const toggleLoginView = () => {
        setLoginView(!isLoginView);
    };

    return (
        <BrowserRouter>
            {/* <NavBar setUser={setUser} setToken={setToken} user={user} /> */}
            <Row className='d-flex justify-content-center'>
                <Routes>
                    <Route
                        path='/login'
                        element={
                            user ? (
                                <Navigate to='/movies' />
                            ) : (
                                <>
                                    {isLoginView ? (
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    ) : (
                                        <SignIn />
                                    )}
                                    <Col className='d-flex justify-content-center'>
                                        <Button
                                            className='link-opacity-75-hover'
                                            variant='link'
                                            onClick={toggleLoginView}
                                        >
                                            {isLoginView
                                                ? "Don't have an account"
                                                : 'I have an account already'}
                                        </Button>
                                    </Col>
                                </>
                            )
                        }
                    />
                    <Route
                        path='/signin'
                        element={
                            user ? (
                                <Navigate to='/movies' />
                            ) : (
                                <>
                                    {isLoginView ? (
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    ) : (
                                        <SignIn />
                                    )}
                                    <Col className='d-flex justify-content-center'>
                                        <Button
                                            className='link-opacity-75-hover'
                                            variant='link'
                                            onClick={toggleLoginView}
                                        >
                                            {isLoginView
                                                ? "Don't have an account"
                                                : 'I have an account already'}
                                        </Button>
                                    </Col>
                                </>
                            )
                        }
                    />
                    <Route
                        path='/movies/:movieID'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : movies.length === 0 ? (
                                    <Col> The list is empty!</Col>
                                ) : (
                                    <>
                                        <NavBar
                                            setUser={setUser}
                                            setToken={setToken}
                                            user={user}
                                        />
                                        <MovieView
                                            movieData={movies}
                                            setUser={setUser}
                                            setToken={setToken}
                                            user={user}
                                        />
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path='/movies'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to={'/login'} />
                                ) : movies.length === 0 ? (
                                    <Col> The list is empty!</Col>
                                ) : (
                                    <Row className='mx-2'>
                                        <NavBar
                                            setUser={setUser}
                                            setToken={setToken}
                                            user={user}
                                        />
                                        {movies.map((movie) => {
                                            return (
                                                <Col
                                                    key={movie.id}
                                                    className='my-3 mx-2'
                                                >
                                                    <MovieCard
                                                        movieData={movie}
                                                    />
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
