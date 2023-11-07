import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const MessageModal = ({ show, message, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant='primary' onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
