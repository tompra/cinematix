import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const FooterView = () => {
    return (
        <Row className='text-center footer--container'>
            <Col xs={12} className='d-flex justify-content-center'>
                <IconContext.Provider value={{ size: '2rem' }}>
                    <div className='d-flex align-items-center'>
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
                    </div>
                </IconContext.Provider>
            </Col>
            <Col xs={12}>
                <p>&copy; Copyright 2023 - Cinematix</p>
            </Col>
        </Row>
    );
};
