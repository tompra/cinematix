import { NavBar } from '../../shared/nav-bar/nav-bar';
import { MovieCard } from '../../shared/movie-card/movie-card';
import { SpinnerComp } from '../../shared/spinner/spinner';
import { Col, Row } from 'react-bootstrap';
import Proptypes from 'prop-types';
import { AuthenticatedRoute } from '../authenticated-route/authenticated-route';
import { useAuthCtx } from '../../../context/auth-context';
import { useMoviesCtx } from '../../../context/movies-context';

export function HomeRoute({ searchMovies }) {
    const { user, setUser, setToken, loading, token } = useAuthCtx();
    const { movies } = useMoviesCtx();

    return (
        <AuthenticatedRoute>
            {loading ? (
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
                            {movies.map((movie) => (
                                <Col key={movie._id}>
                                    <MovieCard
                                        movieData={movie}
                                        user={user}
                                        token={token}
                                        setUser={setUser}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </AuthenticatedRoute>
    );
}
HomeRoute.propTypes = {
    searchMovies: Proptypes.func,
};
