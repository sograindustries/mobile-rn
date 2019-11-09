import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import MainGrid from './MainGrid';
import { COLOR_LIGHT_GRAY } from '../colors';
import { WithApiProps, withApi } from '../api/hoc';
import { View, Text } from 'native-base';
import { refresh } from '../store/session/actions';
import { User } from '../store/session/types';
import { firebase } from '@react-native-firebase/analytics';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Props {
  authorize: () => Promise<void>;
}

const GET_VIEWER_QUERY = gql`
  query GetViewer2 {
    viewer {
      username
      id
    }
  }
`;

const MainScreen2 = (props: Props) => {
  const [isAuthorizing, setIsAuthorizing] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    props
      .authorize()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsAuthorizing(false);
      });
  }, []);

  /*
  const client = useApolloClient();
  React.useEffect(() => {
    if (isAuthenticated) {
      client.query({ query: GET_VIEWER_QUERY }).then(res => {
        console.log('RES:', res);
      }); 
    }
  
  }, [isAuthenticated]);
  */

  if (isAuthorizing) {
    return (
      <View>
        <Text>Authorizing...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isAuthenticated && <Viewer />}
      <MainGrid />
    </SafeAreaView>
  );
};

function Viewer() {
  const { data, loading, error } = useQuery(GET_VIEWER_QUERY);

  if (loading) {
    return (
      <View>
        <Text>Fetching viewer...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {`${error}`}</Text>
      </View>
    );
  }
  console.log('DATA: ', data);
  return (
    <View>
      <Text>Loading viewer...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR_LIGHT_GRAY
  }
});

export default withApi(
  connect(
    (state: AppState) => ({
      tab: state.navigation
    }),
    (dispatch: AppDispatch, ownProps: WithApiProps) => {
      return {
        authorize: async () => {
          const localState = JSON.parse(
            (await ownProps.api.local.getState()) || '{}'
          ) as AppState;

          if (
            localState.session &&
            localState.session.user &&
            localState.session.user.refreshToken
          ) {
            ((await dispatch(
              refresh(localState.session.user!.refreshToken, ownProps.api)
            )) as unknown) as User;

            await firebase
              .analytics()
              .setUserId(localState.session.user!.username);
          }
        }
      };
    }
  )(MainScreen2)
);
