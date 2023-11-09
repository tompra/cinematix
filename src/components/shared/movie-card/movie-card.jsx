import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';
import PropTypes from 'prop-types';

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
            <Card
                className='card--container'
                border='dark'
                style={{ height: '40rem' }}
            >
                <Card.Img
                    variant='top'
                    src={movieData.imageUrl}
                    className='card--img'
                />
                <Card.Body className='bg-dark text-white'>
                    <Card.Title>{movieData.title}</Card.Title>
                    <Card.Subtitle>
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
    movieData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birthyear: PropTypes.string,
            deathyear: PropTypes.string,
        }),
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        actors: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.arrayOf(PropTypes.string),
    }),
    setUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
