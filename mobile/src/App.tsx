import * as React from 'react';
import { View, Text } from 'native-base';
import { Store, createStore, applyMiddleware } from 'redux';
import { makeApi } from './api';
import { AppState, rootReducer, AppDispatch } from './store';
import makePersistStateMiddleware from './middlewares/persistStateMiddleware';
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { refresh } from './store/session/actions';
import WelcomeScreen from './components/WelcomeScreen';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import SplashScreen from 'react-native-splash-screen';
import Viewer from './components/Viewer';

let store: Store | null = null;

function initializeStore(state?: AppState) {
  return createStore(
    rootReducer,
    state as any,
    applyMiddleware(thunk, makePersistStateMiddleware(api))
  );
}

const api = makeApi();

async function init() {
  const localState = await api.local.getState();
  store = localState ? initializeStore(localState) : initializeStore();
  return store;
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

interface InnerAppProps {
  jwt: string | null;
}

function InnerApp(props: InnerAppProps) {
  // Render login page if JWT not present.
  if (!props.jwt) {
    return <WelcomeScreen />;
  }

  return <Viewer />;
}
const HydratedApp = connect((state: AppState) => ({
  jwt: state.session.user ? state.session.user.jwt : null
}))(InnerApp);

function App() {
  const [_, setIsStoreLoaded] = React.useState(false);
  React.useEffect(() => {
    init()
      .then(async store => {
        const state: AppState = store.getState();
        const user = state.session.user;
        if (user && user.refreshToken) {
          await (store.dispatch as AppDispatch)(
            refresh(user.refreshToken, api)
          );
        }
      })
      .catch(error => {})
      .finally(() => {
        setIsStoreLoaded(true);

        try {
          SplashScreen.hide();
        } catch (error) {
          // Ignore error
        }
      });
  });
  // Load local state
  // Attempt Refresh token
  // Fetch data from server if token is available
  // Render UI

  if (!store) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <HydratedApp />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
