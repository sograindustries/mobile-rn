import React from 'react';
import {
  Form,
  Item,
  Input,
  Title,
  Footer,
  FooterTab,
  Button,
  View,
  Text
} from 'native-base';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AppHeader from './AppHeader';
import { COLOR_WHITE } from '../colors';
import { connect } from 'react-redux';
import { login } from '../store/session/actions';
import { withApi, WithApiProps } from '../api/hoc';
import { AppDispatch } from '../store';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

type LoginErrorMessage = string;

interface Props {
  onLoginPress: (
    username: string,
    password: string
  ) => Promise<LoginErrorMessage[]>;
}

function LoginScreen(props: Props) {
  const [username, setUsername] = React.useState('will@argosindustries.com');
  const [password, setPassword] = React.useState('11111111');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleLogin = async () => {
    const errors = await props.onLoginPress(username, password);
    if (errors.length > 0) {
      setErrorMessage(errors.join(', '));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <AppHeader>
          <Title>Login</Title>
        </AppHeader>
        <View style={{ flex: 1 }}>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
              />
            </Item>
          </Form>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        <Footer>
          <FooterTab>
            <Button primary onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Login</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginBtnText: {
    fontSize: 18,
    color: COLOR_WHITE
  },
  errorText: {
    color: 'red'
  }
});

export default withNavigation(
  withApi(
    connect(
      undefined,
      (
        dispatch: AppDispatch,
        ownProps: WithApiProps & NavigationInjectedProps
      ) => {
        return {
          onLoginPress: async (username: string, password: string) => {
            try {
              await dispatch(login(username, password, ownProps.api));
              //     ownProps.navigation.dispatch(resetAction);
              return []; // no errors
            } catch (error) {
              return [error.code as LoginErrorMessage];
            }
          }
        };
      }
    )(LoginScreen)
  )
);
