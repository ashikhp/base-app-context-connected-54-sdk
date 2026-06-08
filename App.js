import React from 'react';
import { View, Text } from 'react-native';
import Store from './src/store'
import Main from './src/App'
const App = () => {
  return (
    <Store>
      <Main />
    </Store>
  );
}
export default App;
