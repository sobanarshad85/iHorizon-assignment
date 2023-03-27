import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import Screens from './src/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Screens />
      </PersistGate>
    </Provider>
  );
}

export default App;
