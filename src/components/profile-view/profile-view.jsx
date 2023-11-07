import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MessageModal } from '../message-modal/message-modal';

export const ProfileView = ({ setUser, user, token, movieData }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);
    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState('');
    const [showDelete, setShowDelete] = useState(false);

    const favMovies = user.favoriteMovies
        ? movieData.filter((movie) => user.favoriteMovies.includes(movie._id))
        : [];

    const showMessage = (message) => {
        setMessage(message);
        setMessageModal(true);
    };

    const closeMessage = () => {
        setMessageModal(false);
    };

    const showDeleteModal = () => {
        setShowDelete(true);
    };
    const hideDeleteModal = () => {
        setShowDelete(false);
    };

    const handleDelete = () => {
        fetch(`https://popcornhub-api.onrender.com/users/${user.username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            if (!response.ok) {
                showMessage('Something went wrong when deleting account');
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                setUser(null);
                localStorage.clear();
                showMessage('Your account has been deleted');
            }
        });
        hideDeleteModal();
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
                if (!response.ok) {
                    showMessage('Update information failed');
                    console.log(await response.text());
                } else {
                    return response.json();
                }
            })
            .then(async (updateData) => {
                if (updateData) {
                    localStorage.setItem('user', JSON.stringify(updateData));
                    setUser(updateData);
                    showMessage('Information updated succesfully!');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <Container className='d-flex flex-column align-items-center justify-content-center'>
                <Row
                    xs={12}
                    md={6}
                    className='d-flex flex-column align-items-center mt-4 bg-dark text-white w-50 rounded-3 p-4'
                >
                    <Col className='w-100 text-center'>
                        <h1>Update information</h1>
                    </Col>
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
                                <Button
                                    className='btn-danger mx-2'
                                    onClick={showDeleteModal}
                                >
                                    Delete account
                                </Button>
                                <Link to={'/'}>
                                    <Button className='mx-2'>Back</Button>
                                </Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <h1 className='text-center'>Favorite Movies</h1>
                    {favMovies.length === 0 ? (
                        <h2 className='text-center'>
                            No favorite movies added yet.
                        </h2>
                    ) : (
                        favMovies.map((movie) => (
                            <Col
                                key={movie._id}
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
                    <MessageModal
                        show={messageModal}
                        message={message}
                        onHide={closeMessage}
                    />
                </Row>
                <Modal show={showDelete} onHide={hideDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete your account?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hideDeleteModal}>
                            Cancel
                        </Button>
                        <Link to='/login'>
                            <Button variant='danger' onClick={handleDelete}>
                                Delete
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};
