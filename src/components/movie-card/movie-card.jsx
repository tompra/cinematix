import Proptypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Heart from 'react-animated-heart';

export const MovieCard = ({ movieData, user, setFavoriteMovie }) => {
    return (
        <>
            <Card style={{ width: '18rem', minHeight: '36rem' }}>
                <Card.Img
                    variant='top'
                    src={movieData.image}
                    className='card--img'
                />
                <Card.Body>
                    <Card.Title className='mb-3'>{movieData.title}</Card.Title>
                    <Card.Subtitle className='mb-3'>
                        Directed by: {movieData.director.name}
                    </Card.Subtitle>
                    <div className='d-flex justify-content-around align-items-center'>
                        <Button>Add to Favorite</Button>
                        <Link
                            to={`/movies/${encodeURIComponent(movieData.id)}}`}
                        >
                            <Button>Open</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
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
};
