
import React from 'react';
import { AppwriteProvider } from './appwrite/AppwriteContext';
import { Router } from './routes/Router';
import 'react-native-gesture-handler';

function App(): React.JSX.Element {

  return (

    <AppwriteProvider>
      <Router/>
    </AppwriteProvider>

  );
}


export default App;
