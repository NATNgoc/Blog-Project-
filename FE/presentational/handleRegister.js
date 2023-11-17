// RegisterLogic.js
import React, { useState } from 'react';
import Login from '../container/Login';
import Register from '../container/Register';
import Welcome from '../container/Welcome';

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
