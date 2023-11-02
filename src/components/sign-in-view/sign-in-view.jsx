import { useState } from 'react';
import { Button, Form, Image, Container, Row, Col } from 'react-bootstrap';
import logo from '../../images/cinematix-logo.svg';
import { Link } from 'react-router-dom';
import { MessageModal } from '../message-modal/message-modal';

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState('');

    const showMessage = (message) => {
        setMessage(message);
        setMessageModal(true);
    };

    const closeMessage = () => {
        setMessageModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };

        fetch('https://popcornhub-api.onrender.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    showMessage('Something went wrong!');
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    showMessage("You're signed in!");
                    window.location.replace('/login');
                }
            })
            .catch((error) => {
                console.error(error);
                showMessage('Something went wrong!');
            });
    };
    return (
        <>
            <Container className='user__form--container'>
                <Row className='user__box--container'></Row>
                <Row>
                    <Col xs={12} md={6} className='text-center'>
                        <Image
                            src={logo}
                            alt='Cinematix logo'
                            className='img-fluid'
                        />
                    </Col>
                    <Col xs={12} md={6} className='form--container'>
                        <Form onSubmit={handleSubmit}>
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
                            <Form.Group controlId='formEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId='formBirthday'>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={birthday}
                                    onChange={(e) =>
                                        setBirthday(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-center my-3'>
                                <Button type='submit' variant='primary'>
                                    Signup
                                </Button>
                            </Form.Group>
                        </Form>
                        <div className='text-center'>
                            <Link to={'/login'}>
                                <Button
                                    className='link-opacity-75-hover text-decoration-none'
                                    variant='link'
                                >
                                    I have an account already
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <MessageModal
                    show={messageModal}
                    message={message}
                    onHide={closeMessage}
                />
            </Container>
        </>
    );
};
