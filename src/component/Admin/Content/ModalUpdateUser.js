import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';
import React from 'react';
import _ from 'lodash';

import { toast } from 'react-toastify';

import { putUpdateUser } from '../../../services/apiServices';

const ModelUpdateUser = (props) => {
    const { show, setShow, fetchListUsers, dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('abc');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
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

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage('');
        }
    };

    const handleSubmitUpdateUser = async () => {
        //valid

        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsers();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal className="modal-create-user" backdrop="static" size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update user info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder=""
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    disabled
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Username"
                                    value={username}
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={role} onChange={(event) => setRole(event.target.value)}>
                                    <option value={'USER'}>User</option>
                                    <option value={'ADMIN'}>Admin</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="file" onChange={(event) => handleUploadImage(event)} />
                        </Form.Group>
                    </Form>
                    <div className="avatar">
                        <div className="img-preview ">
                            {previewImage ? <Image src={previewImage} roundedCircle /> : <span>Preview Image</span>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModelUpdateUser;
