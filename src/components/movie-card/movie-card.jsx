import Proptypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';

export const MovieCard = ({ movieData, user, setUser, token }) => {
    const [favoriteMovie, setFavoriteMovie] = useState(false);
    useEffect(() => {
        if (
            user.favoriteMovies &&
            user.favoriteMovies.includes(movieData._id)
        ) {
            setFavoriteMovie(true);
        } else {
            setFavoriteMovie(false);
        }
    }, [user, movieData]);

    const addFavoriteMovie = () => {
        fetch(
            `https://popcornhub-api.onrender.com/users/${user.username}/movies/${movieData._id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    alert('Failed to add favorite movie');
                    throw new Error('Failed to add favorite movie');
                } else {
                    return response.json();
                }
            })
            .then((user) => {
                console.log('add favorite', user);
                setFavoriteMovie(true);
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((err) => console.error(err));
    };

    const removeFavoriteMovie = () => {
        fetch(
            `https://popcornhub-api.onrender.com/users/${user.username}/movies/${movieData._id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    alert('Failed to remove favorite movie');
                    throw new Error('Failed to remove favorite movie');
                } else {
                    alert('Movie deleted succesfully');
                    return response.json();
                }
            })
            .then((user) => {
                console.log('remove favorite', movieData._id);
                setFavoriteMovie(false);
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((err) => console.error(err));
    };
    return (
        <>
            <Card style={{ width: '18rem', minHeight: '36rem' }}>
                <Card.Img
                    variant='top'
                    src={movieData.imageUrl}
                    className='card--img'
                />
                <Card.Body style={{ backgroundColor: '#96cdff' }}>
                    <Card.Title className='mb-3'>{movieData.title}</Card.Title>
                    <Card.Subtitle className='mb-3'>
                        Directed by: {movieData.director.name}
                    </Card.Subtitle>
                    <div className='d-flex justify-content-around align-items-center'>
                        <Heart
                            isClick={favoriteMovie}
                            onClick={() => {
                                if (favoriteMovie) {
                                    removeFavoriteMovie();
                                } else {
                                    addFavoriteMovie();
                                }
                            }}
                        />

                        <Link
                            to={`/movies/${encodeURIComponent(movieData._id)}`}
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
        imageUrl: Proptypes.string.isRequired,
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
