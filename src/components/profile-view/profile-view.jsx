import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ setUser, user, token, movieData }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);

    const favMovies = user.favoriteMovies
        ? movieData.filter((movie) => user.favoriteMovies.includes(movie._id))
        : [];

    const handleDelete = () => {
        fetch(`https://popcornhub-api.onrender.com/users/${user.username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                setUser(null);
                localStorage.clear();
                alert('Your account has been deleted');
            } else {
                alert('Something went wrong when deleting account');
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };
        fetch(`https://popcornhub-api.onrender.com/users/${user.username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    alert('Update succesful');
                    return response.json();
                } else {
                    console.log(await response.text());
                    alert('Update failed');
                }
            })
            .then(async (updateData) => {
                if (updateData) {
                    localStorage.setItem('user', JSON.stringify(updateData));
                    setUser(updateData);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <Container
                className='d-flex flex-column align-items-center my-3'
                style={{ minHeight: '100vh' }}
            >
                <h1>Update information</h1>
                <Row xs={12} md={6} className='form--container'>
                    <Col xs={12} style={{ width: '30rem' }}>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group controlId='formUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    minLength={5}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId='formPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    minLength={8}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={birthday.split('T')[0]}
                                    onChange={(e) =>
                                        setBirthday(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='my-3 d-flex justify-content-center'>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='mx-2'
                                >
                                    Update
                                </Button>
                                <Link to='/login'>
                                    <Button
                                        className='btn-danger mx-2'
                                        onClick={handleDelete}
                                    >
                                        Delete account
                                    </Button>
                                </Link>
                                <Link to={'/'}>
                                    <Button className='mx-2'>Back</Button>
                                </Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className='my-3'>
                    <h1 className='text-center my-4'>Favorite Movies</h1>
                    {favMovies.length === 0 ? (
                        <h2>No favorite movies added yet.</h2>
                    ) : (
                        favMovies.map((movie) => (
                            <Col
                                key={movie.id}
                                className='d-flex justify-content-center '
                            >
                                <MovieCard
                                    movieData={movie}
                                    token={token}
                                    setUser={setUser}
                                    user={user}
                                />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    );
};
