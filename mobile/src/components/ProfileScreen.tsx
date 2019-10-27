import React from 'react';
import LoginScreen from './LoginScreen';
import { Container, Content, Title, Text, View, Button } from 'native-base';
import AppHeader from './AppHeader';
import { User } from '../store/session/types';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { Divider } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { COLOR_BLUE } from '../colors';
import { logout } from '../store/session/actions';
import { withApi, WithApiProps } from '../api/hoc';

interface Props {
  isAuthenticated: boolean;
  user: User | null;

  onLogoutPress: () => void;
}

const ProfileScreen = (props: Props) => {
  if (!props.isAuthenticated || !props.user) {
    return <LoginScreen />;
  }
  return (
    <Container>
      <AppHeader>
        <Title>Profile</Title>
      </AppHeader>
      <Content>
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldNameText}>Username</Text>
          <Text style={styles.fieldValueText}>{props.user.username}</Text>
        </View>
        <Divider />
        <View style={styles.fieldWrapper}>
          <Button transparent onPress={props.onLogoutPress}>
            <Text>Logout</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  fieldNameText: {
    fontWeight: 'bold',
    paddingLeft: 15,
    flex: 1
  },
  fieldValueText: {
    flex: 2,
    color: COLOR_BLUE
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  }
});

export default withApi(
  connect(
    (state: AppState) => {
      return {
        isAuthenticated: state.session.user !== null,
        user: state.session.user
      };
    },
    (dispatch: AppDispatch, ownProps: WithApiProps) => {
      return {
        onLogoutPress: () => {
          dispatch(logout(ownProps.api));
        }
      };
    }
  )(ProfileScreen)
);
