import React, { useState } from 'react';

import Main from './Main'
import LoginScreen from './src/screens/LoginScreen';
import auth from '@react-native-firebase/auth';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (authenticated) {
    return <Main />;
  }

  return <LoginScreen />;

  //return <Main />;
}

export default App;