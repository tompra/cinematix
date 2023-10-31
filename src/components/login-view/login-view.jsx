import React from 'react';
import { useState } from 'react';
import { Button, Form, Image, Container, Row, Col } from 'react-bootstrap';
import logo from '../../images/cinematix-logo.svg';
import { Link } from 'react-router-dom';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then((response) => {
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    localStorage.setItem('token', response.token);
                    onLoggedIn(response.user, response.token);
                } else {
                    alert('There is no user');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Something went wrong!');
            });
    };
    return (
        <>
            <Container
                style={{ minHeight: '100vh' }}
                className='d-flex justify-content-center align-items-center'
            >
                <Row>
                    <Col xs={12} md={6}>
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
                            <Form.Group className='my-3 d-flex justify-content-center'>
                                <Button type='submit' variant='primary'>
                                    Login
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className='text-center'>
                        <Link to={'/signin'}>
                            <Button
                                className='link-opacity-75-hover'
                                variant='link'
                            >
                                Don't have an account
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
