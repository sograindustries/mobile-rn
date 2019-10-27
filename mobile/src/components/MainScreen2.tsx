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

interface Props {
  authorize: () => Promise<void>;
}

const MainScreen2 = (props: Props) => {
  const [isAuthorizing, setIsAuthorizing] = React.useState(true);

  React.useEffect(() => {
    props.authorize().finally(() => {
      setIsAuthorizing(false);
    });
  }, []);

  if (isAuthorizing) {
    return (
      <View>
        <Text>Authorizing...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainGrid />
    </SafeAreaView>
  );
};

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
            await firebase
              .analytics()
              .setUserId(localState.session.user!.username);

            ((await dispatch(
              refresh(localState.session.user!.refreshToken, ownProps.api)
            )) as unknown) as User;
          }
        }
      };
    }
  )(MainScreen2)
);
