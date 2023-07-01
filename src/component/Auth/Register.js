import React from 'react';
import './Register.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    //hide show password
    const [show, setShow] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState('password');

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        //valid
        if (email === '') {
            toast.error('Please enter your email');
            return;
        }

        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }

        if (password === '') {
            toast.error('Please enter your password');
            return;
        }

        if (username === '') {
            toast.error('Please enter your username');
            return;
        }

        let data = await postRegister(email, password, username);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="register-container">
            <div className="header">
                <span>Have an account yet?</span>
                <button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Log in
                </button>
            </div>
            <div className="title col-4 mx-auto">Register</div>
            <div className="welcome col-4 mx-auto">Welcome to VUX Quiz</div>
            <div className="content-form col-4 mx-auto">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            placeholder="Email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Group className="password-input">
                            <Form.Control
                                type={inputPasswordType}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                value={password}
                                placeholder="Password"
                            />
                            <div className="icon-show-hide">
                                {show ? (
                                    <AiOutlineEyeInvisible
                                        onClick={() => {
                                            setInputPasswordType('password');
                                            setShow(!show);
                                        }}
                                    />
                                ) : (
                                    <AiOutlineEye
                                        onClick={() => {
                                            setInputPasswordType('text');
                                            setShow(!show);
                                        }}
                                    />
                                )}
                            </div>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            value={username}
                            placeholder="Username"
                        />
                    </Form.Group>

                    <Button variant="primary" className="mx-auto " onClick={() => handleRegister()}>
                        Register
                    </Button>
                    <div className="d-flex justify-content-center mt-2 btn-back">
                        <span
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            {' '}
                            &#60; Go To Homepage
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
