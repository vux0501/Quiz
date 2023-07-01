import React from 'react';
import Background from '../../assets/background_homepage.jpg';
import { useSelector } from 'react-redux';

const HomePage = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    return (
        <div className="homepage-container">
            <img className="background-homepage" src={Background} alt="Background" />
            <div className="homepage-content">
                <div className="title-1">Welcome to VUX Quiz</div>
                <div className="title-2">Knowledge is power.</div>
                <div className="title-3">
                    <button className="btn-title-3">Get's started</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
