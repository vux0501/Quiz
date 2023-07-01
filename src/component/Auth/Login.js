import React from 'react';
import './Login.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //hide show password
    const [show, setShow] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState('password');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        let data = await postLogin(email, password);
        //valid
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

        if (data && +data.EC === 0) {
            dispatch(doLogin(data));
            console.log(data.DT.username);
            toast.success(`Welcome ${data.DT.username}`);
            navigate('/');
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button
                    onClick={() => {
                        navigate('/register');
                    }}
                >
                    Sign up
                </button>
            </div>
            <div className="title col-4 mx-auto">LOGIN</div>
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
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                        <Form.Text className="text-muted">Forgot password?</Form.Text>
                    </Form.Group>
                    <Button variant="primary" className="mx-auto " onClick={() => handleLogin()}>
                        Login
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

export default Login;
