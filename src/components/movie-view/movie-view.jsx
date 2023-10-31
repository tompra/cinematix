import { Button, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
export const MovieView = ({ movieData }) => {
    const { movieID } = useParams();
    const movie = movieData.find((mov) => mov.id === parseInt(movieID));
    return (
        <>
            <Row className='mx-2'>
                <Col xs={12} md={3} lg={3}>
                    <Image
                        src={movie.image}
                        alt='Movie Poster'
                        className='img-fluid'
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
                </Col>
                <Row>
                    <Link to={'/'}>
                        <Col className='d-flex justify-content-center'>
                            <Button>Back</Button>
                        </Col>
                    </Link>
                </Row>
            </Row>
        </>
    );
};
