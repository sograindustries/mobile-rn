import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import { rootReducer, AppState, AppDispatch } from './store';
import makePersistStateMiddleware from './middlewares/persistStateMiddleware';
import { makeApi } from './api';
import thunk from 'redux-thunk';
import BleContainer from './ble/BleContainer';
import { View } from 'native-base';
import { refresh } from './store/session/actions';
import { firebase } from '@react-native-firebase/analytics';
import { User } from './store/session/types';
import Viewer from './components/Viewer';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';

const api = makeApi();
let store: Store | null = null;

function initializeStore(state?: AppState) {
  store = createStore(
    rootReducer,
    state as any,
    applyMiddleware(makePersistStateMiddleware(api), thunk)
  );
}

async function authorize() {
  if (!store) {
    return;
  }

  const localState = JSON.parse(
    (await api.local.getState()) || '{}'
  ) as AppState;

  if (
    localState.session &&
    localState.session.user &&
    localState.session.user.refreshToken
  ) {
    ((await (store.dispatch as AppDispatch)(
      refresh(localState.session.user!.refreshToken, api)
    )) as unknown) as User;

    await firebase.analytics().setUserId(localState.session.user!.username);
  }
}

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  //uri: 'http://192.168.1.70:4000'
  uri:
    'https://9sqzy2t6ji.execute-api.us-east-1.amazonaws.com/production/graphql'

  //'https://9sqzy2t6ji.execute-api.us-east-1.amazonaws.com/production/graphql'
});
const authLink = setContext((_, { headers }) => {
  if (!store) {
    return {};
  }

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
        initializeStore(undefined);
      })
      .finally(async () => {
        try {
          await authorize();
        } catch (error) {
          console.warn('Failed to authorize: ', error);
        }

        setLoading(false);
      });
  }, []);

  if (loading || !store) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BleContainer />
        <Viewer />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
