import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ThemeProvider } from 'react-native-elements';
import MainScreen2 from './components/MainScreen2';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './store';
import makePersistStateMiddleware from './middlewares/persistStateMiddleware';
import { makeApi } from './api';
import thunk from 'redux-thunk';
import { Root } from 'native-base';
import ProfileScreen from './components/ProfileScreen';
import BleContainer from './ble/BleContainer';
import { defaultService as defaultBleService } from './ble/service';
import { makeStorage } from './ecg-storage';

export const SCREEN_KEY_PROFLIE = 'PROFILE';
export const SCREEN_KEY_HOME = 'HOME';

const MainNavigator = createStackNavigator(
  {
    [SCREEN_KEY_HOME]: {
      screen: MainScreen2
    },
    [SCREEN_KEY_PROFLIE]: {
      screen: ProfileScreen
    }
  },
  { headerMode: 'none' }
);

const App = createAppContainer(MainNavigator);

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(makePersistStateMiddleware(makeApi()), thunk)
);

export const __store = store;

const ProvidedApp = () => {
  return (
    <Root>
      <ThemeProvider>
        <Provider store={store}>
          <BleContainer />
          <App />
        </Provider>
      </ThemeProvider>
    </Root>
  );
};

let globalBufferSize = 0;
let globalBuffer: number[] = [];

const storage = makeStorage();

defaultBleService.addOnValueListener(async value => {
  globalBuffer = globalBuffer.concat([...value]);
  globalBufferSize += 30;
  if ((globalBufferSize / 30) % 10 === 0) {
    storage.add(globalBuffer);
  }

  if ((globalBufferSize / 30) % 50 === 0) {
    const values: { [key: string]: number[] } = await storage.getPayloads();
    const data = Object.keys(values)
      .sort()
      .map(k => values[k])
      .flat();

    console.log('UPLOADING: ', data.length);

    globalBuffer = [];
    globalBufferSize = 0;
  }
});

export default ProvidedApp;
