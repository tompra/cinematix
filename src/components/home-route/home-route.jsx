import { NavBar } from '../nav-bar/nav-bar';
import { MovieCard } from '../movie-card/movie-card';
import { SpinnerComp } from '../spinner/spinner';
import { Col, Row } from 'react-bootstrap';

export function HomeRoute({
    user,
    setUser,
    setToken,
    movies,
    searchMovies,
    loading,
    token,
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
    );
}
