// LoginLogic.js
import React, { useState } from 'react';
import Login from '../container/Login';
import Welcome from '../container/Welcome';

const HandleLogin = () => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  };

  if (isClick) {
    return <Welcome />;
  }

  return <Login handleClick={handleClick} />;
};

export default HandleLogin;
