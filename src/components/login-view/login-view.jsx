import React from 'react';
import { useState } from 'react';
import { Button, Form, Image, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/cinematix-logo.svg';
import { MessageModal } from '../message-modal/message-modal';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        };
        fetch('https://popcornhub-api.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    showMessage('Username or Password incorrect!');
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    showMessage('Login succesful!');
                    return response.json();
                }
            })
            .then((response) => {
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    localStorage.setItem('token', response.token);
                    showMessage('Login succesful!');
                    onLoggedIn(response.user, response.token);
                } else {
                    showMessage('Something went wrong!');
                }
            })
            .catch((err) => {
                console.error(err);
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
                            <Form.Group className='d-flex justify-content-center my-3'>
                                <Button type='submit' variant='primary'>
                                    Login
                                </Button>
                            </Form.Group>
                            <div className='text-center'>
                                <Link to={'/signin'}>
                                    <Button
                                        className='link-opacity-75-hover text-decoration-none'
                                        variant='link'
                                    >
                                        Don't have an account
                                    </Button>
                                </Link>
                            </div>
                        </Form>
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
