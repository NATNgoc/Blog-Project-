// RegisterLogic.js
import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from '../components/Welcome';

const RegisterLogic = () => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  };

  if (isClick) {
    return <Login />;
  }

  return <Register handleClick={handleClick} />;
};

export default RegisterLogic;
