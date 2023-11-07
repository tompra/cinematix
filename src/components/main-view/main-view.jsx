import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginRoute } from '../login-route/login-route';
import { SignInRoute } from '../signin-route/signin-route';
import { MovieRoute } from '../movie-route/movie-route';
import { HomeRoute } from '../home-route/home-route';
import { ProfileRoute } from '../profile-route/profile-route';

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
                        <MovieRoute
                            user={user}
                            loading={loading}
                            setUser={setUser}
                            setToken={setToken}
                            movies={movies}
                            similarMovies={similarMovies}
                            token={token}
                            searchMovies={searchMovies}
                        />
                    }
                />
                <Route
                    path='/'
                    element={
                        <HomeRoute
                            user={user}
                            setUser={setUser}
                            setToken={setToken}
                            movies={movies}
                            searchMovies={searchMovies}
                            loading={loading}
                            token={token}
                        />
                    }
                />
                <Route
                    path='/users'
                    element={
                        <ProfileRoute
                            user={user}
                            setUser={setUser}
                            setToken={setToken}
                            movies={movies}
                            token={token}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
