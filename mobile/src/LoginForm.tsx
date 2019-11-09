import * as React from 'react';
import { Form, Item, View, Input, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { COLOR_GREEN2 } from './colors';
import { AppDispatch } from './store';
import { WithApiProps, withApi } from './api/hoc';
import { login } from './store/session/actions';
import { connect } from 'react-redux';

type LoginErrorMessage = string;

interface Props {
  onLoginPress: (
    username: string,
    password: string
  ) => Promise<LoginErrorMessage[]>;
}

function LoginForm(props: Props) {
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
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View
        style={{
          flex: 2,
          margin: 20
        }}>
        <Form
          style={{
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLOR_GREEN2
          }}>
          <Item>
            <Input
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
          </Item>
          <Item>
            <Input
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ backgroundColor: COLOR_GREEN2 }}
          onPress={handleLogin}>
          <Text>Login</Text>
        </Button>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}>
          <Button transparent>
            <Text>Sign Up</Text>
          </Button>
          <Button transparent>
            <Text>Forgot Password</Text>
          </Button>
        </View>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red'
  }
});

export default withApi(
  connect(
    undefined,
    (dispatch: AppDispatch, ownProps: WithApiProps) => {
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
  )(LoginForm)
);
