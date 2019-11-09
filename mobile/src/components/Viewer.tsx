import * as React from 'react';
import { View } from 'native-base';
import { AppState } from '../store';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { User } from '../store/user/types';
import { setUser } from '../store/user/actions';
import { useGetViewerLazyQuery } from '../generated/graphql';
import AppNavigator from './AppNavigator';
import Spinner from 'react-native-spinkit';
import { COLOR_GREEN2 } from '../colors';

interface Props {
  jwt: string | null;
  userId: number | null;
  onUserLoaded: (user: User) => void;
}

function Viewer(props: Props) {
  console.log('VIEWER: ', props);

  const [getUser, { data, loading, error }] = useGetViewerLazyQuery();

  React.useEffect(() => {
    console.log('SHOURLCE GET USER? ', props.jwt && true);
    if (props.jwt) {
      getUser({
        context: {
          headers: {
            authorization: props.jwt
          }
        }
      });
    }
  }, [props.jwt]);

  React.useEffect(() => {
    if (data && data.viewer && data.viewer.id && data.viewer.username) {
      props.onUserLoaded({
        id: data.viewer.id,
        username: data.viewer.username,
        firstName: data.viewer.firstName || null,
        lastName: data.viewer.lastName || null
      });
    }
  }, [data]);

  console.log('DATA:', data);

  if (props.userId) {
    return <AppNavigator />;
  }

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Spinner size={100} isVisible={true} type="Pulse" color={COLOR_GREEN2} />
    </View>
  );
}

Viewer.queries = {
  viewer: gql`
    query GetViewer {
      viewer {
        id
        username
        firstName
        lastName
      }
    }
  `
};

export default connect(
  (state: AppState) => {
    return {
      jwt: state.session.user ? state.session.user.jwt : null,
      userId: state.user ? state.user.id : null
    };
  },
  dispatch => {
    return {
      onUserLoaded: (user: User) => {
        dispatch(setUser(user));
      }
    };
  }
)(Viewer);
