import React from 'react';
import Background from '../../assets/background_homepage.jpg';

const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <img className="background_homepage" src={Background} alt="Background" />
        </div>
    );
};

export default HomePage;
