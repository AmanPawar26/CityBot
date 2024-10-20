import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../Toast/Toast'; // We'll create this component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('authToken', data.token);
          setToastMessage('Successfully Logged In');
          setShowToast(true);
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setToastMessage(`Login failed: ${data.msg || 'Invalid credentials'}`);
          setShowToast(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setToastMessage('An error occurred during login');
        setShowToast(true);
      }
    } else {
      setToastMessage('Please enter a valid email and password');
      setShowToast(true);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder='Username' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon' />
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" />Remember Me</label>
          <Link to="/reset-password">Forgot password?</Link>
        </div>

        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default Login;