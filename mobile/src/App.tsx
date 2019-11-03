import * as React from 'react';
import AppNavigator from './components/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './store';
import makePersistStateMiddleware from './middlewares/persistStateMiddleware';
import { makeApi } from './api';
import thunk from 'redux-thunk';
import BleContainer from './ble/BleContainer';

const api = makeApi();
const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(makePersistStateMiddleware(api), thunk)
);

function App() {
  return (
    <Provider store={store}>
      <BleContainer />
      <AppNavigator />
    </Provider>
  );
}

export default App;
