import React from 'react';
import curve from '../../assets/curve.png'; // Update path if needed
import robot from '../../assets/robot.jpg'; // Update path if needed
import heroBackground from '../../assets/hero-background.jpg'; // Update path if needed
import './Hero.css'; // Import your CSS file
import Generating from '../Generating/Generating';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-heading">
          Discover Your City's Best with {` `}
          <span>
            CityBot{" "}
            <img
              src={curve}
              alt="Curve"
            />
          </span>
        </h1>
        <p className="hero-description">
          CityBot reveals your city's best—from events to hidden gems. Your ultimate guide to urban adventures.
        </p>
      </div>

      {/* New Section with the Robot Image */}
      <div className="robot-section">
        <div className="robot-container">
          <div className="robot-header"></div>
          <div className="robot-image-wrapper">
            <img
              src={robot}
              className="robot-image"
              alt="Robot"
            />
          </div>
        </div>
      </div>
      

       {/* Include the Generating Component */}
       <Generating className="generating-container-position" />
    </section>
  );
};

export default Hero;

