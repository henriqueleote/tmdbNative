import React, { useState } from 'react';

import Main from './Main'


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  // });

  // if (authenticated) {
  //   return <MainActivity />;

  // }

  //return <Login />;

  return <Main />;
}

export default App;