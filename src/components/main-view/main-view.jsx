import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignIn } from '../sign-in-view/sign-in-view';
import { Row, Col } from 'react-bootstrap';
import { NavBar } from '../nav-bar/nav-bar';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [isLoginView, setLoginView] = useState(true);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch('https://popcornhub-api.onrender.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(data => {
                const moviesFromAPI = data.map((movie, index) => {
                    return {
                        id: index + 1,
                        title: movie.title,
                        description: movie.description,
                        director: {
                            name: movie.director.name,
                            bio: movie.director.bio,
                            birth: movie.director.birth,
                            death: movie.director.death,
                        },
                        genre: {
                            name: movie.genre.name,
                            description: movie.genre.description,
                        },
                        image: movie.imageUrl,
                        actors: movie.actors,
                        featured: movie.featured,
                    };
                });
                setMovies(moviesFromAPI);
            })
            .catch(err => console.error(err));
    }, [token]);

    const toggleLoginView = () => {
        setLoginView(!isLoginView);
    };

    if (!user) {
        return (
            <div>
                <Row className='d-flex justify-content-center'>
                    {isLoginView ? (
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }}
                        />
                    ) : (
                        <SignIn />
                    )}
                    <p className='text-center'>
                        <a
                            href='#'
                            className='link-opacity-75-hover'
                            onClick={toggleLoginView}
                        >
                            {isLoginView
                                ? "Don't have an account"
                                : 'I have an account already'}
                        </a>
                    </p>
                </Row>
            </div>
        );
    }

    if (selectedMovie) {
        const similarMovies = movies.filter(movie => {
            return (
                movie.genre.name === selectedMovie.genre.name &&
                movie.title !== selectedMovie.title
            );
        });
        let similarMoviesContent;

        if (similarMovies.length === 0) {
            similarMoviesContent = <h2>There is no similar movies</h2>;
        } else {
            similarMoviesContent = (
                <div>
                    <Row className='d-flex justify-content-center mx-1'>
                        <Col>
                            <h2>Similar movies</h2>
                            {similarMovies.map(movie => {
                                return (
                                    <MovieCard
                                        key={movie.id}
                                        movieData={movie}
                                        onMovieClick={newSelectedMovie =>
                                            setSelectedMovie(newSelectedMovie)
                                        }
                                        style={{width: '12rem', minHeight: '25rem'}}
                                    />
                                );
                            })}
                        </Col>
                    </Row>
                </div>
            );
        }
        return (
            <div>
                    <MovieView
                        movieData={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                        setUser={setUser} 
                        setToken={setToken}
                        user={user}
                    />
                    <hr />
                    {similarMoviesContent}
                
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div>
                <p> The list is empty!</p> 
            </div>
        );
    }
    return (
        <>
            <div>
                <NavBar setUser={setUser} setToken={setToken} user={user}/>
                <Row className='mx-2'>
                    {movies.map(movie => {
                        return (
                            <Col key={movie.id} className='my-3 mx-2'>
                                <MovieCard
                                    movieData={movie}
                                    onMovieClick={newSelectedMovie =>
                                        setSelectedMovie(newSelectedMovie)
                                    }
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </>
    );
};
