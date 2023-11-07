import { Navigate } from 'react-router-dom';
import { NavBar } from '../nav-bar/nav-bar';
import { SpinnerComp } from '../spinner/spinner';
import { MovieView } from '../movie-view/movie-view';

export function MovieRoute({
    user,
    loading,
    setUser,
    setToken,
    movies,
    similarMovies,
    token,
    searchMovies,
}) {
    if (!user) {
        <Navigate to='/login' replace />;
    }

    return loading ? (
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
            <MovieView
                movieData={movies}
                similarMovies={similarMovies}
                user={user}
                token={token}
            />
        </>
    );
}
