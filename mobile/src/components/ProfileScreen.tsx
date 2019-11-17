import React from 'react';
import LoginScreen from './LoginScreen';
import {
  Container,
  Content,
  Title,
  Text,
  View,
  Button,
  ListItem,
  Right,
  Body
} from 'native-base';
import { User } from '../store/session/types';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { logout } from '../store/session/actions';
import { withApi, WithApiProps } from '../api/hoc';
import Settings from './Settings';
import { Platform } from 'react-native';
import AppHeader from './AppHeader';

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
    <Container
      style={{
        backgroundColor: '#ecebf2',
        marginTop: Platform.OS === 'android' ? 20 : 0
      }}>
      <AppHeader>
        <Title>Profile</Title>
      </AppHeader>
      <Content>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <ListItem icon>
            <Body>
              <Text>Username</Text>
            </Body>
            <Right>
              <Text>{props.user.username}</Text>
            </Right>
          </ListItem>
        </View>

        <Settings />
      </Content>

      <Button transparent onPress={props.onLogoutPress} full>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};

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
