import { useState } from 'react';
import {
    Button,
    Form,
    Image,
    Container,
    Row,
    Col,
    Card,
} from 'react-bootstrap';
import logo from '../../../assets/cinematix-logo.svg';
import { Link, Navigate } from 'react-router-dom';
import { MessageModal } from '../../shared/message-modal/message-modal';

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
                    console.error('http error! Status ' + response.status);
                    throw new Error(
                        `HTTP error! Status: ${
                            response.status
                        } and ${response.text()}`
                    );
                } else {
                    showMessage("You're signed in!");
                    <Navigate to='/login' replace />;
                }
            })
            .then((errorDetails) => {
                console.error('errorDetails', errorDetails);
                showMessage(errorDetails);
            })
            .catch((error) => {
                console.error(error);
                showMessage('Something went wrong!');
            });
    };
    return (
        <>
            <Container
                fluid
                className='py-3 h-100 gradient-custom user__form--container'
            >
                <Row className='d-flex justify-content-center align-items-center h-100 '>
                    <Col sm={12} md={8} lg={6} xl={5}>
                        <Card
                            className='bg-dark text-white'
                            style={{ borderRadius: '1rem' }}
                        >
                            <Card.Body className='p-5 text-center'>
                                <div className='mb-md-4 mt-md-3 pb-3'>
                                    <h2 className='fw-bold mb-2 text-uppercase'>
                                        Welcome to
                                    </h2>
                                    <Image
                                        src={logo}
                                        alt='Cinematix logo'
                                        className='img-fluid'
                                    />
                                    <p className='text-white-50 mb-5'>
                                        Please enter your login and password!
                                    </p>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group
                                            controlId='formUsername'
                                            className='my-2'
                                        >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type='text'
                                                value={username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                minLength={5}
                                                autoComplete='none'
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId='formPassword'
                                            className='my-2'
                                        >
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
                                        <Form.Group
                                            controlId='formEmail'
                                            className='my-2'
                                        >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type='email'
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                autoComplete='none'
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId='formBirthday'
                                            className='my-2'
                                        >
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control
                                                type='date'
                                                value={birthday}
                                                onChange={(e) =>
                                                    setBirthday(e.target.value)
                                                }
                                                className='text-center'
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className='d-flex justify-content-center my-3'>
                                            <Button
                                                variant='primary'
                                                size='lg'
                                                className='px-5'
                                                type='submit'
                                            >
                                                Sign in
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div>
                                    <p className='mb-0'>
                                        You have an account?
                                        <Link to={'/login'}>
                                            <Button
                                                className='link-opacity-75-hover text-decoration-none'
                                                variant='link'
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
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
