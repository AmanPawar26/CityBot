import React, { useState } from 'react';
import './Register.css'; // Reusing the same CSS
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateName = (name) => {
    return name.length > 0;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateName(username) && validateEmail(email) && validatePassword(password)) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Registration successful!');
          window.location.href = '/'; // Redirect to the homepage or another page
        } else {
          setError(`Registration failed: ${data.msg}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred during registration.');
      }
    } else {
      setError('Please enter valid details.');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <button type="submit">Register</button>
        <div className="register-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
