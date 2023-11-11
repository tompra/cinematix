import React, { useState } from 'react';
import { useAuthCtx } from './auth-context';

const moviesContext = React.createContext({});

export function useMoviesCtx() {
    return React.useContext(moviesContext);
}

export function MoviesProvider({ children }) {
    const { loading, setLoading } = useAuthCtx();
    const [movies, setMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);

    const similarMovies = (selectedMovie) => {
        return movies.filter((movie) => {
            return (
                selectedMovie.genre.name === movie.genre.name &&
                selectedMovie.title !== movie.title
            );
        });
    };

    const searchMovies = (userInput) => {
        if (userInput === '') {
            setMovies(initialMovies);
        } else {
            const filterMovies = movies.filter((movie) => {
                return movie.title
                    .toLowerCase()
                    .includes(userInput.toLowerCase());
            });
            setMovies(filterMovies);
        }
    };

    const value = React.useMemo(
        () => ({
            movies,
            setMovies,
            initialMovies,
            setInitialMovies,
            loading,
            setLoading,
            similarMovies,
            searchMovies,
        }),
        [movies, initialMovies, loading]
    );

    return (
        <moviesContext.Provider value={value}>
            {children}
        </moviesContext.Provider>
    );
}
