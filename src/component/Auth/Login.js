import React from 'react';
import './Login.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        let data = await postLogin(email, password);
        //valid

        if (data && +data.EC === 0) {
            toast.success(data.EM);
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
                <button>Sign up</button>
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
                        <Form.Control
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            value={password}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                        <Form.Text className="text-muted">Forgot password?</Form.Text>
                    </Form.Group>
                    <Button variant="primary" className="mx-auto " onClick={() => handleLogin()}>
                        Submit
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
