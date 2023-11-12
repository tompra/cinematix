import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginRoute } from '../../routes/login-route/login-route';
import { SignInRoute } from '../../routes/signin-route/signin-route';
import { MovieRoute } from '../../routes/movie-route/movie-route';
import { HomeRoute } from '../../routes/home-route/home-route';
import { ProfileRoute } from '../../routes/profile-route/profile-route';
import { useAuthCtx } from '../../../context/auth-context';
import { useMoviesCtx } from '../../../context/movies-context';

export const MainView = () => {
    const { setMovies, setInitialMovies } = useMoviesCtx();
    const { token, setLoading, user } = useAuthCtx();

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
    }, [token, setMovies, setInitialMovies, setLoading]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginRoute />} />
                <Route path='/signin' element={<SignInRoute />} />
                <Route path='/movies/:movieId' element={<MovieRoute />} />
                <Route path='/' element={<HomeRoute />} />
                <Route path='/users' element={<ProfileRoute />} />
            </Routes>
        </BrowserRouter>
    );
};
