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
  Body,
  Left,
  Footer
} from 'native-base';
import AppHeader from './AppHeader';
import { User } from '../store/session/types';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { Divider } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { COLOR_BLUE } from '../colors';
import { logout } from '../store/session/actions';
import { withApi, WithApiProps } from '../api/hoc';
import Settings from './Settings';

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
    <Container style={{ backgroundColor: '#ecebf2' }}>
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

      <Footer>
        <Button transparent onPress={props.onLogoutPress} full>
          <Text>Logout</Text>
        </Button>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  fieldNameText: {
    fontWeight: 'bold',
    paddingLeft: 15,
    flex: 1
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
