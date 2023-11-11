import React from 'react';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MovieCard } from '../../shared/movie-card/movie-card';
import { useMoviesCtx } from '../../../context/movies-context';
import { useAuthCtx } from '../../../context/auth-context';

export const MovieView = () => {
    const { movies, similarMovies } = useMoviesCtx();
    const { movieId } = useParams();
    const movie = movies.find((mov) => mov._id === movieId);
    const setSimilarMovies = similarMovies(movie);

    return (
        <>
            <Row className='mx-2 my-3 bg-dark text-white movie--view__container'>
                <Col xs={12} md={3} lg={3}>
                    <Image
                        src={movie.imageUrl}
                        alt='Movie Poster'
                        className='img-fluid border border-secondary-subtle'
                    />
                </Col>
                <Col xs={12} md={9} lg={9}>
                    <Row>
                        <p className='fs-1'>{movie.title}</p>
                    </Row>
                    <Row className='border-bottom mb-2'>
                        <Col xs={6} md={3} lg={2}>
                            <p className='fs-5 fw-bold'>Description</p>
                        </Col>
                        <Col xs={6} md={6} lg={7}>
                            <p>{movie.description}</p>
                        </Col>
                    </Row>
                    <Row className='border-bottom mb-2'>
                        <Col xs={6} md={3} lg={2}>
                            <p className='fs-5 fw-bold'>Genre</p>
                        </Col>
                        <Col xs={6} md={6} lg={7}>
                            <span>{movie.genre.name}</span>
                        </Col>
                    </Row>
                    <Row className='border-bottom mb-2'>
                        <Col xs={6} md={3} lg={2}>
                            <p className='fs-5 fw-bold'>Director</p>
                        </Col>
                        <Col xs={6} md={6} lg={7}>
                            <span>{movie.director.name}</span>
                        </Col>
                    </Row>
                    <Row className='border-bottom mb-2'>
                        <Col xs={6} md={3} lg={2}>
                            <p className='fs-5 fw-bold'>Stars</p>
                        </Col>
                        <Col xs={6} md={6} lg={7}>
                            <span>{movie.actors.join('∙ ')}</span>
                        </Col>
                    </Row>
                    <Row className='my-4'>
                        <Link to={'/'}>
                            <Col className='d-flex justify-content-center'>
                                <Button>Back</Button>
                            </Col>
                        </Link>
                    </Row>
                </Col>
            </Row>
            <Row className='w-100 my-2 mt-4'>
                <h2 className='ms-4'>Similar movies</h2>
                {setSimilarMovies.length > 0 ? (
                    <>
                        <Col>
                            {setSimilarMovies.map((movie) => (
                                <MovieCard key={movie._id} movieData={movie} />
                            ))}
                        </Col>
                    </>
                ) : (
                    <h1 className='mx-2'>
                        There are no similar movies for this movie
                    </h1>
                )}
            </Row>
        </>
    );
};
