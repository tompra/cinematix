import './movie-card.scss';
import Proptypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <Card style={{ width: '18rem', minHeight: '36rem' }}>
            <Card.Img variant='top' src={movieData.image} />
            <Card.Body>
                <Card.Title className='mb-3'>{movieData.title}</Card.Title>
                <Card.Subtitle className='mb-3'>
                    Directed by: {movieData.director.name}
                </Card.Subtitle>
                <div className='text-center'>
                    <Button onClick={() => onMovieClick(movieData)}>Open</Button>
                </div>
            </Card.Body>
        </Card>
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
