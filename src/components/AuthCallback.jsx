import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else if (error) {
      navigate('/login', { state: { error: 'Google login failed' } });
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;