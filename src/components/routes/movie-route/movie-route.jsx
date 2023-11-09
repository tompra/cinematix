import { Navigate } from 'react-router-dom';
import { SpinnerComp } from '../../shared/spinner/spinner';
import { MovieView } from '../../views/movie-view/movie-view';
import { NavBar } from '../../shared/nav-bar/nav-bar';

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
