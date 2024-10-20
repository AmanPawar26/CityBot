import React from 'react';
import './Navbar.css';
import logo from '../../assets/citybot-logo.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom'; // Add this for routing

const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        <a href="#hero">
          <img src={logo} alt="Logo" />
        </a>
        <div className="logo-text">CityBot</div>
      </div>
      
      <div className="nav-links-container">
        <ul>
          <li><ScrollLink to='hero' smooth={true} offset={0} duration={500}>HOME</ScrollLink></li>
          <li><ScrollLink to='features' smooth={true} offset={-110} duration={500}>FEATURES</ScrollLink></li>
          <li><ScrollLink to='about' smooth={true} offset={-60} duration={500}>ABOUT US</ScrollLink></li>
        </ul>
      </div>

      <div className="nav-buttons">
        {/* Use Link to route to login page */}
        <Link to="/login">
          <button className="btn-signin">Log In</button>
        </Link>
        <Link to="/dashboard">
        <button className="btn-guest">Guest</button>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
