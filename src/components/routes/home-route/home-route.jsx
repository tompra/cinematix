import { NavBar } from "../../shared/nav-bar/nav-bar";
import { MovieCard } from "../../shared/movie-card/movie-card";
import { SpinnerComp } from "../../shared/spinner/spinner";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router";
import Proptypes from "prop-types";
import AuthenticatedRoute from "../authenticated-route/authenticated-route";

export function HomeRoute({
  user,
  setUser,
  setToken,
  movies,
  searchMovies,
  loading,
  token,
}) {
  return (
    <AuthenticatedRoute>
      {loading ? (
        <>
          <NavBar
            setUser={setUser}
            setToken={setToken}
            user={user}
            searchMovies={searchMovies}
          />
          <SpinnerComp />
        </>
      ) : (
        <>
          <NavBar
            setUser={setUser}
            setToken={setToken}
            user={user}
            searchMovies={searchMovies}
          />
          {movies.length === 0 ? (
            <Col className="text-center">
              <h1>There is no movie</h1>
            </Col>
          ) : (
            <Row className="w-100">
              {movies.map((movie) => (
                <Col key={movie._id}>
                  <MovieCard
                    movieData={movie}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </AuthenticatedRoute>
  );
}
HomeRoute.propTypes = {
  user: Proptypes.object,
  setUser: Proptypes.func,
  setToken: Proptypes.func,
  movies: Proptypes.array,
  searchMovies: Proptypes.func,
  loading: Proptypes.bool,
  token: Proptypes.string,
};
