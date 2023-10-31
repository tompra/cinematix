import Proptypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';

export const MovieCard = ({ movieData, user, setUser, token }) => {
    const [isclick, setClick] = useState(false);
    const [favoriteMovie, setFavoriteMovie] = useState(false);

    const addFavoriteMovie = () => {
        fetch(
            `https://popcornhub-api.onrender.com/users/${user.username}/movies/${movieData.id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            }
        )
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Failed to add favorite movie');
                }
            })
            .then((user) => {
                console.log(user);
            })
            .catch((err) => console.error(err));
    };

    const removeFavoriteMovie = () => {
        fetch(
            `https://popcornhub-api.onrender.com/users/${user.username}/movies/${movieData.id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Failed to remove favorite movie');
                }
            })
            .then((user) => {
                console.log(user);
            })
            .catch((err) => console.error(err));
    };
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
                        {/* <Heart
                            isClick={isclick}
                            onClick={() => setClick(!isclick)}
                        /> */}
                        {favoriteMovie ? (
                            <Button onClick={removeFavoriteMovie}>
                                Remove from Favorites
                            </Button>
                        ) : (
                            <Button onClick={addFavoriteMovie}>
                                Add to Favorites
                            </Button>
                        )}
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
