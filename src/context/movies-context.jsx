import React, {useState} from "react";
import { useAuthCtx } from "./auth-context";

const moviesContext = React.createContext({});

export function useMoviesCtx() {
  return React.useContext(moviesContext);
}

export function MoviesProvider({ children }) {
  const { loading, setLoading } = useAuthCtx();
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);

  const value = React.useMemo(
    () => ({
      movies,
      setMovies,
      initialMovies,
      setInitialMovies,
      loading,
      setLoading,
    }),
    [movies, initialMovies, loading]
  );

  return (
    <moviesContext.Provider value={value}>{children}</moviesContext.Provider>
  );
}
