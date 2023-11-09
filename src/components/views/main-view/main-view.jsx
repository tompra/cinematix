import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginRoute } from "../../routes/login-route/login-route";
import { SignInRoute } from "../../routes/signin-route/signin-route";
import { MovieRoute } from "../../routes/movie-route/movie-route";
import { HomeRoute } from "../../routes/home-route/home-route";
import { ProfileRoute } from "../../routes/profile-route/profile-route";
import { useAuthCtx } from "../../../context/auth-context";
import { useMoviesCtx } from "../../../context/movies-context";

export const MainView = () => {

  const {
    movies,
    setMovies,
    initialMovies,
    setInitialMovies,
  } = useMoviesCtx();

  const {
    user,
    setUser,
    token,
    setToken,
    loading,
    setLoading,
  } = useAuthCtx();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://popcornhub-api.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setInitialMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token, setMovies, setInitialMovies, setLoading]);

  const similarMovies = (selectedMovie) => {
    return movies.filter((movie) => {
      return (
        selectedMovie.genre.name === movie.genre.name &&
        selectedMovie.title !== movie.title
      );
    });
  };

  const searchMovies = (userInput) => {
    if (userInput === "") {
      setMovies(initialMovies);
    } else {
      const filterMovies = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(userInput.toLowerCase());
      });
      setMovies(filterMovies);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginRoute
              user={user}
              setUser={setUser}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route path="/signin" element={<SignInRoute user={user} />} />
        <Route
          path="/movies/:movieId"
          element={
              <MovieRoute
                user={user}
                loading={loading}
                setUser={setUser}
                setToken={setToken}
                movies={movies}
                similarMovies={similarMovies}
                token={token}
                searchMovies={searchMovies}
              />
          }
        />
        <Route
          path="/"
          element={
            <HomeRoute
              searchMovies={searchMovies}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProfileRoute
              user={user}
              setUser={setUser}
              setToken={setToken}
              movies={movies}
              token={token}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
