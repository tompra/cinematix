import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignIn } from '../sign-in-view/sign-in-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

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

    if (!user) {
        return (
            <div>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                <SignIn />
            </div>
        );
    }

    if (selectedMovie) {
        //Filter movies by genres by name
        const similarMovies = movies.filter(movie => {
            // Similar genre name
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
                    <h2>Similar movies</h2>
                    {similarMovies.map(movie => {
                        return (
                            <MovieCard
                                key={movie.id}
                                movieData={movie}
                                onMovieClick={newSelectedMovie =>
                                    setSelectedMovie(newSelectedMovie)
                                }
                            />
                        );
                    })}
                </div>
            );
        }
        return (
            <div>
                <MovieView
                    movieData={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
                <hr />
                {similarMoviesContent}
            </div>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map(movie => {
                return (
                    <MovieCard
                        key={movie.id}
                        movieData={movie}
                        onMovieClick={newSelectedMovie =>
                            setSelectedMovie(newSelectedMovie)
                        }
                    />
                );
            })}
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </button>
        </div>
    );
};
