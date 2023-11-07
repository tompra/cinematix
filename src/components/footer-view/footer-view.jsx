import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const FooterView = () => {
    return (
        <>
            <Container fluid className='py-4 px-4 px-xl-5 bg-dark text-white'>
                <Row className='d-flex flex-column flex-md-row text-center text-md-start justify-content-between'>
                    <Col className='text-white mb-3 mb-md-0'>
                        Copyright © {new Date().getFullYear()} - Cinematix. All
                        rights reserved.
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <IconContext.Provider
                            value={{ size: '1.3rem', color: 'white' }}
                        >
                            <a
                                href='http://facebook.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <FaFacebook className='mx-3' />
                            </a>
                            <a
                                href='http://instagram.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <FaInstagram className='mx-3' />
                            </a>
                            <a
                                href='http://twitter.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <FaTwitter className='mx-3' />
                            </a>
                        </IconContext.Provider>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
