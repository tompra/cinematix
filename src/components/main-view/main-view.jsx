import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignIn } from '../sign-in-view/sign-in-view';
import { NavBar } from '../nav-bar/nav-bar';
import { ProfileView } from '../profile-view/profile-view';
import { FooterView } from '../footer-view/footer-view';
import { SpinnerComp } from '../spinner/spinner';
import { LoginRoute } from '../login-route/login-route';
import { SignInRoute } from '../signin-route/signin-route';

export const MainView = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const initUser = storedUser ? JSON.parse(storedUser) : null;
    const initToken = storedToken ? storedToken : null;
    const [movies, setMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);
    const [user, setUser] = useState(initUser);
    const [token, setToken] = useState(initToken);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        fetch('https://popcornhub-api.onrender.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setInitialMovies(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [token]);

    const similarMovies = (selectedMovie) => {
        return movies.filter((movie) => {
            return (
                selectedMovie.genre.name === movie.genre.name &&
                selectedMovie.title !== movie.title
            );
        });
    };

    const searchMovies = (userInput) => {
        if (userInput === '') {
            setMovies(initialMovies);
        } else {
            const filterMovies = movies.filter((movie) => {
                return movie.title
                    .toLowerCase()
                    .includes(userInput.toLowerCase());
            });
            setMovies(filterMovies);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/login'
                    element={
                        <LoginRoute
                            user={user}
                            setUser={setUser}
                            token={token}
                            setToken={setToken}
                        />
                    }
                />
                <Route path='/signin' element={<SignInRoute user={user} />} />
                <Route
                    path='/movies/:movieId'
                    element={
                        <>
                            {!user ? (
                                <Navigate to='/login' replace />
                            ) : loading ? (
                                <div>
                                    <NavBar
                                        setUser={setUser}
                                        setToken={setToken}
                                        user={user}
                                        searchMovies={searchMovies}
                                    />
                                    <SpinnerComp />
                                </div>
                            ) : (
                                <>
                                    <NavBar
                                        setUser={setUser}
                                        setToken={setToken}
                                        user={user}
                                        searchMovies={searchMovies}
                                    />
                                    <MovieView
                                        movieData={movies}
                                        similarMovies={similarMovies}
                                        user={user}
                                        token={token}
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
                            ) : loading ? (
                                <>
                                    <NavBar
                                        setUser={setUser}
                                        setToken={setToken}
                                        user={user}
                                        searchMovies={searchMovies}
                                    />
                                    <SpinnerComp />
                                </>
                            ) : (
                                <>
                                    <NavBar
                                        setUser={setUser}
                                        setToken={setToken}
                                        user={user}
                                        searchMovies={searchMovies}
                                    />
                                    {movies.length === 0 ? (
                                        <Col className='text-center'>
                                            <h1>There is no movie</h1>
                                        </Col>
                                    ) : (
                                        <Row className='w-100'>
                                            {movies.map((movie) => {
                                                return (
                                                    <Col key={movie._id}>
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
                                    )}
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
