import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    VUX Quiz
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/user" className="nav-link">
                            User
                        </NavLink>
                        <NavLink to="/admin" className="nav-link">
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button className="btn-signup" onClick={() => handleRegister()}>
                                    Sign up
                                </button>
                                <button className="btn-login" onClick={() => handleLogin()}>
                                    Log in
                                </button>
                            </>
                        ) : (
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>Log in</NavDropdown.Item>
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
