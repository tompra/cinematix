import { Button, Container, Row, Col ,Image } from "react-bootstrap";
import { NavBar } from "../nav-bar/nav-bar";
export const MovieView = ({ movieData, onBackClick, setUser, setToken }) => {
    return (
        <>
            <NavBar setToken={setToken} setUser={setUser} />
            <Container className='d-flex justify-content-center my-3'>
                <Row>
                    <Col xs={12} md={3} lg={3}>
                        <Image
                            src={movieData.image}
                            alt='Movie Poster'
                            className='img-fluid'
                        />
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                        <Row>
                          <p className="fs-1">{movieData.title}</p>
                        </Row>
                        <Row className="border-bottom mb-2">
                          <Col xs={6} md={3} lg={2}> {/* Adjust column sizes as needed */}
                            <p className="fs-5 fw-bold">Description</p>
                          </Col>
                          <Col xs={6} md={6} lg={7}> {/* Adjust column sizes as needed */}
                            <p>{movieData.description}</p>
                          </Col>
                        </Row>
                        <Row className="border-bottom mb-2">
                          <Col xs={6} md={3} lg={2}>
                            <p className="fs-5 fw-bold">Genre</p>
                          </Col>
                          <Col xs={6} md={6} lg={7}>
                            <span>{movieData.genre.name}</span>
                          </Col>
                        </Row>
                        <Row className="border-bottom mb-2">
                          <Col xs={6} md={3} lg={2}>
                            <p className="fs-5 fw-bold">Director</p>
                          </Col>
                          <Col xs={6} md={6} lg={7}>
                            <span>{movieData.director.name}</span>
                          </Col>
                        </Row>
                        <Row className="border-bottom mb-2">
                          <Col xs={6} md={3} lg={2}>
                            <p className="fs-5 fw-bold">Stars</p>
                          </Col>
                          <Col xs={6} md={6} lg={7}>
                            <span>{movieData.actors.join('∙ ')}</span>
                          </Col>
                        </Row>
                    </Col>
                    <Row>
                      <Col className="d-flex justify-content-center">
                          <Button onClick={onBackClick}>Back</Button>
                      </Col>
                    </Row>
                </Row>
            </Container>
        </>
    );
};
