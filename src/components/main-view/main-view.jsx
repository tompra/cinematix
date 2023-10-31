import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignIn } from '../sign-in-view/sign-in-view';
import { Row, Col } from 'react-bootstrap';
import { NavBar } from '../nav-bar/nav-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(
        storedUser ? JSON.parse(storedUser) : null
    );
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch('https://popcornhub-api.onrender.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error(err));
    }, [token]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/login'
                    element={
                        user ? (
                            <Navigate to='/' />
                        ) : (
                            <>
                                <LoginView
                                    onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                    }}
                                />
                            </>
                        )
                    }
                />
                <Route
                    path='/signin'
                    element={
                        user ? (
                            <Navigate to='/' />
                        ) : (
                            <>
                                <SignIn />
                            </>
                        )
                    }
                />
                <Route
                    path='/movies/:movieId'
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
                    path='/'
                    element={
                        <>
                            {!user ? (
                                <Navigate to={'/login'} replace />
                            ) : movies.length === 0 ? (
                                <Col> The list is empty!</Col>
                            ) : (
                                <>
                                    <NavBar
                                        setUser={setUser}
                                        setToken={setToken}
                                        user={user}
                                    />
                                    <Row>
                                        {movies.map((movie) => {
                                            console.log(movie._id);
                                            return (
                                                <Col
                                                    className='my-3 mx-2'
                                                    key={movie._id}
                                                >
                                                    <MovieCard
                                                        movieData={movie}
                                                        user={user}
                                                        token={token}
                                                        setUser={setUser}
                                                    />
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </>
                            )}
                        </>
                    }
                />
                <Route
                    path='/users'
                    element={
                        <>
                            {!user ? (
                                <Navigate to={'/login'} replace />
                            ) : (
                                <>
                                    <NavBar
                                        setUser={setUser}
                                        setToken={setToken}
                                        user={user}
                                    />
                                    <ProfileView
                                        setUser={setUser}
                                        user={user}
                                        token={token}
                                        movieData={movies}
                                    />
                                </>
                            )}
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
