import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import Screens from './src/navigation';

function App() {
  return (
    <Provider store={store}>
      <Screens />
    </Provider>
  );
}

export default App;
