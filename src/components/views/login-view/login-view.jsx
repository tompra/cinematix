import { useState } from 'react';
import {
    Button,
    Form,
    Image,
    Container,
    Row,
    Col,
    Card,
    InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/cinematix-logo.svg';
import { MessageModal } from '../../shared/message-modal/message-modal';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const showMessage = (message) => {
        setMessage(message);
        setMessageModal(true);
    };

    const closeMessage = () => {
        setMessageModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch(
                'https://popcornhub-api.onrender.com/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                showMessage(
                    `HTTP error! Status: ${response.status} Details: ${errorText}`
                );
                throw new Error(errorText);
            }

            const responseData = await response.json();
            showMessage('Login successful!');

            if (responseData.user) {
                localStorage.setItem('user', JSON.stringify(responseData.user));
                localStorage.setItem('token', responseData.token);
                onLoggedIn(responseData.user, responseData.token);
            } else {
                showMessage('Something went wrong!');
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error(err);
            showMessage('Something went wrong!');
        }
    };
    return (
        <>
            <Container
                fluid
                className='py-3 gradient-custom user__form--container '
            >
                <Row className='d-flex justify-content-center align-items-center  '>
                    <Col sm={12} md={8} lg={6} xl={5}>
                        <Card
                            className='bg-dark text-white'
                            style={{ borderRadius: '1rem' }}
                        >
                            <Card.Body className='p-5 text-center'>
                                <div className='mb-md-5 mt-md-4 pb-5'>
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
                                        <Form.Group className='form-outline form-white mb-4'>
                                            <Form.Label htmlFor='username'>
                                                Username
                                            </Form.Label>
                                            <Form.Control
                                                type='text'
                                                value={username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                minLength={5}
                                                id='username'
                                                name='username'
                                                autoComplete='off'
                                                className='initial--forms'
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className='form-outline form-white mb-4'>
                                            <Form.Label htmlFor='password'>
                                                Password
                                            </Form.Label>
                                            <InputGroup className='initial--forms'>
                                                <Form.Control
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    minLength={8}
                                                    id='password'
                                                    name='password'
                                                    required
                                                />
                                                <Button
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <FaEyeSlash />
                                                    ) : (
                                                        <FaEye />
                                                    )}
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                        <Button
                                            variant='primary'
                                            size='lg'
                                            className='px-5 mt-4'
                                            type='submit'
                                        >
                                            Login
                                        </Button>
                                    </Form>
                                </div>
                                <div>
                                    <p className='mb-0'>
                                        Don&#39;t have an account?
                                        <Link to={'/signin'}>
                                            <Button
                                                className='link-opacity-75-hover text-decoration-none'
                                                variant='link'
                                            >
                                                Sign up
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
