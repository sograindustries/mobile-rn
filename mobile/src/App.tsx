import * as React from 'react';
import AppNavigator from './components/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import { rootReducer, AppState } from './store';
import makePersistStateMiddleware from './middlewares/persistStateMiddleware';
import { makeApi } from './api';
import thunk from 'redux-thunk';
import BleContainer from './ble/BleContainer';
import { View } from 'native-base';

const api = makeApi();
let store: Store | null = null;

function initializeStore(state?: AppState) {
  store = createStore(
    rootReducer,
    state as any,
    applyMiddleware(makePersistStateMiddleware(api), thunk)
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.local
      .getState()
      .then(state => {
        if (state) {
          return JSON.parse(state);
        }

        return undefined;
      })
      .then(initializeStore)
      .catch((error: any) => {
        console.warn(error);
        initializeStore;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !store) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <BleContainer />
      <AppNavigator />
    </Provider>
  );
}

export default App;
