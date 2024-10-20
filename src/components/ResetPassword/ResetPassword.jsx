// ResetPassword.jsx
import React, { useState } from 'react';
import './ResetPassword.css'; // Import the CSS for styles
import { FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Reset email sent! Please check your inbox.');
        } else {
          alert(`Failed to send reset email: ${data.msg || 'Please check your email address'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaEnvelope className="icon" />
        </div>
        <button type="submit">Reset Password</button>
        <div className="back-link">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
