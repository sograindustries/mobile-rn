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
import { Root, View } from 'native-base';
import ProfileScreen from './components/ProfileScreen';
import BleContainer from './ble/BleContainer';
import { defaultService as defaultBleService } from './ble/service';
import { makeStorage } from './ecg-storage';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { logEvent } from './logging';

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

const api = makeApi();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(makePersistStateMiddleware(api), thunk)
);

export const __store = store;

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri:
    'https://9sqzy2t6ji.execute-api.us-east-1.amazonaws.com/production/graphql'
});
const authLink = setContext((_, { headers }) => {
  const user = store.getState().session.user;

  if (!user) {
    return headers;
  }

  return {
    headers: {
      ...headers,
      authorization: user.jwt
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

const ProvidedApp = () => {
  return (
    <Root>
      <ThemeProvider>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <BleContainer />
            <BleListener />
            <App />
          </ApolloProvider>
        </Provider>
      </ThemeProvider>
    </Root>
  );
};

let globalBufferSize = 0;
let globalBuffer: number[] = [];
let deviceId: string | null = null;

const storage = makeStorage();

function BleListener() {
  React.useEffect(() => {
    setInterval(async () => {
      const values: { [key: string]: number[] } = await storage.getPayloads();
      const data = (Object.keys(values)
        .sort()
        .map(k => values[k]) as any).flat();

      const user = store.getState().session.user;
      if (user && user.sub && user.jwt && deviceId) {
        logEvent('payload_uploaded', {});
        api.ecg.upload(data, user.username, user.jwt, deviceId);
      }

      globalBuffer = [];
      globalBufferSize = 0;
    }, 15000);
  });

  return <View />;
}

export default ProvidedApp;
