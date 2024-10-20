import React from 'react';
import loading from '../../assets/loading.png'; // Update path if needed
import './Generating.css'; // Import your CSS file

const Generating = ({ className }) => {
  return (
    <div className={`generating-container ${className || ''}`}>
      <img className="loading-icon" src={loading} alt="Loading" />
      <span>CityBot is exploring the best options...</span>
    </div>
  );
};

export default Generating;
