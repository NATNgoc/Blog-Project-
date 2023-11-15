// LoginLogic.js
import React, { useState } from 'react';
import Login from '../components/Login';
import Welcome from '../components/Welcome';

const handleLogin = () => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  };

  if (isClick) {
    return <Welcome />;
  }

  return <Login handleClick={handleClick} />;
};

export default handleLogin;
