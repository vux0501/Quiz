import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';

const ModalCreateUser = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setPreviewImage('');
        setShow(false);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage('');
        }
    };

    const handleSubmitCreateUser = async () => {
        //valid

        //call api
        // let data = {
        //     email: email,
        //     password: password,
        //     username: username,
        //     role: role,
        //     userImage: image,
        // };
        // console.log(data);

        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data);
        console.log(res);
    };

    return (
        <>
            <Modal className="modal-create-user" backdrop="static" size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group
                                as={Col}
                                controlId="formGridUsername"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            >
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Select defaultValue={'USER'} onChange={(event) => setRole(event.target.value)}>
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateUser;
