import { NavBar } from '../../shared/nav-bar/nav-bar';
import { MovieCard } from '../../shared/movie-card/movie-card';
import { SpinnerComp } from '../../shared/spinner/spinner';
import { Col, Row } from 'react-bootstrap';
import { AuthenticatedRoute } from '../authenticated-route/authenticated-route';
import { useAuthCtx } from '../../../context/auth-context';
import { useMoviesCtx } from '../../../context/movies-context';

export function HomeRoute() {
    const { loading } = useAuthCtx();
    const { movies } = useMoviesCtx();

    return (
        <AuthenticatedRoute>
            {loading ? (
                <>
                    <NavBar />
                    <SpinnerComp />
                </>
            ) : (
                <>
                    <NavBar />
                    {movies.length === 0 ? (
                        <Col className='text-center m-3'>
                            <h1>No movie found...</h1>
                        </Col>
                    ) : (
                        <Row className='w-100'>
                            {movies.map((movie) => (
                                <Col key={movie._id}>
                                    <MovieCard movieData={movie} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </AuthenticatedRoute>
    );
}
