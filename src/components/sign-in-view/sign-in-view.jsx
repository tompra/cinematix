import { useState } from 'react';
import { Button, Form, Image, Container, Row, Col } from 'react-bootstrap';
import logo from '../../images/cinematix-logo.svg';
import { Link } from 'react-router-dom';

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

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
                    console.error(
                        `Signup failed with status: ${response.status}`
                    );
                    return response.text().then((text) => {
                        console.error(`Error response: ${text}`);
                        throw Error(`There was an error signing up the user`);
                    });
                } else {
                    alert('Signup successful');
                    window.location.replace('/login');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Signup failed');
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
                                    value={birthday}
                                    onChange={(e) =>
                                        setBirthday(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='my-3 d-flex justify-content-center'>
                                <Button type='submit' variant='primary'>
                                    Signup
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className='text-center'>
                        <Link to={'/login'}>
                            <Button
                                className='link-opacity-75-hover'
                                variant='link'
                            >
                                I have an account already
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
