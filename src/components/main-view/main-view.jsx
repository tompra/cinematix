import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://popcornhub-api.onrender.com/movies')
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
    }, []);

    if (selectedMovie) {
        //Filter movies by genres by name
        let similarMovies = movies.filter(movie => {
            if (movie.genre.name === selectedMovie.genre.name) return movie;
        });
        return (
            <div>
                <MovieView
                    movieData={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
                <hr />
                <h2>Similar movies</h2>
                {/* Map movies that are similar */}
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
        </div>
    );
};
