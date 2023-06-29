import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Image } from 'react-bootstrap';
import React from 'react';
import _ from 'lodash';
import Card from 'react-bootstrap/Card';
import { FaRegPaperPlane } from 'react-icons/fa';

const ModelUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
    };

    const [, setEmail] = useState('');
    const [, setUsername] = useState('abc');
    const [, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);

            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpge;base64,${dataUpdate.image}`);
            } else {
                setPreviewImage('');
            }
        }
    }, [dataUpdate]);

    return (
        <>
            <Modal className="modal-view-user" centered size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{dataUpdate.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '18rem' }}>
                        <Image className="avatar" variant="top" src={previewImage} roundedCircle />
                        <Card.Body>
                            <Card.Title>Role: {`${dataUpdate.role}`}</Card.Title>
                            <Card.Text>Email: {`${dataUpdate.email}`}</Card.Text>
                            <Button variant="primary">
                                <FaRegPaperPlane className="me-2" />
                                Send a message
                            </Button>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModelUpdateUser;
