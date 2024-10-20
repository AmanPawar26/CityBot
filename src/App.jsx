import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'
import ResetPassword from './components/ResetPassword/ResetPassword';
import Weather from './components/Weather/Weather';



const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {location.pathname !== '/dashboard' && <Navbar />}

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <About />
            <Footer />
          </>
        } />

        {/* Login and Register Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <>
            <Dashboard />
            <Weather /> {/* Move Weather component to dashboard */}
          </>
        } />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};


const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
