import React, { useEffect } from 'react';
import './Toast.css';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};