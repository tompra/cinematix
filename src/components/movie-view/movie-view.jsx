import { Button, Container, Row, Image } from "react-bootstrap";
import { NavBar } from "../nav-bar/nav-bar";
export const MovieView = ({ movieData, onBackClick, setUser, setToken }) => {
    return (
        <>
            <NavBar setToken={setToken} setUser={setUser} />
            <Container>
                <Row className='movie--details__container'>
                    <span className='movie--details__title'>Title</span>
                    <br />
                    <span>{movieData.title}</span>
                </Row>
                <Row>
                    <Image
                        src={movieData.image}
                        alt='Movie Poster'
                        className='movie-billboard'
                    />
                </Row>
                <Row className='movie--details__container'>
                    <span className='movie--details__title'>Description</span>
                    <br />
                    <span>{movieData.description}</span>
                </Row>
                <Row className='movie--details__container'>
                    <span className='movie--details__title'>Genre</span>
                    <br />
                    <span>{movieData.genre.name}</span>
                </Row>
                <Row className='movie--details__container'>
                    <span className='movie--details__title'>Director</span>
                    <br />
                    <span>{movieData.director.name}</span>
                </Row>
                <Row className='movie--details__container'>
                    <span className='movie--details__title'>Stars</span>
                    <br />
                    <span>{movieData.actors.join(', ')}</span>
                </Row>
                <Button onClick={onBackClick}>Back</Button>
            </Container>
        </>
    );
};
