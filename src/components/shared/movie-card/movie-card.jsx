import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthCtx } from '../../../context/auth-context';

export const MovieCard = ({ movieData }) => {
    const { user, setUser, token } = useAuthCtx();
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
    }, [user]);

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
                toast.success('Added to favorite movies', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            })
            .catch((err) => {
                console.error(err);
                toast.warning(`🔴 ${err}`, {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
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
                setFavoriteMovie(false);
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                toast.error('Removed from favorite movies', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            })
            .catch((err) => {
                console.error(err);
                toast.warning(`🔴 ${err}`, {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
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
                        <ToastContainer
                            position='top-center'
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
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
