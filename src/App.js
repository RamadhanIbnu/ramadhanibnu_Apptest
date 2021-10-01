import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';

import Store from './redux/Store/Store';
import {ContactList} from './pages';

import Router from './routers';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
