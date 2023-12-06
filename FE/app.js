import React from 'react';
import { AuthProvider } from './components/Context';
import AppNavigator from './components/AppNavigator';
import ProfileUser from './presentitional/ProfileUser';
const App = () => {
  return  (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;


 