import './movie-card.scss';
import Proptypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <Row xs={2} sm={3} md={4} lg={5} className='g-4'>
            <Col>
                <Card>
                    <Card.Img
                        variant='top'
                        src={movieData.image}
                        style={{
                            height: '200px',
                            width: '150px',
                            objectFit: 'cover',
                        }}
                    />
                    <Card.Body>
                        <Card.Title>{movieData.title}</Card.Title>
                        <Card.Subtitle>
                            Directed by: {movieData.director.name}
                        </Card.Subtitle>
                        <Button onClick={() => onMovieClick(movieData)}>
                            Open
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

MovieCard.propTypes = {
    movieData: Proptypes.shape({
        title: Proptypes.string.isRequired,
        description: Proptypes.string.isRequired,
        image: Proptypes.string.isRequired,
        director: Proptypes.shape({
            name: Proptypes.string.isRequired,
            bio: Proptypes.string.isRequired,
            birthyear: Proptypes.string,
            deathyear: Proptypes.string,
        }),
        genre: Proptypes.shape({
            name: Proptypes.string.isRequired,
            description: Proptypes.string,
        }),
        actors: Proptypes.arrayOf(Proptypes.string),
    }).isRequired,
    onMovieClick: Proptypes.func.isRequired,
};
