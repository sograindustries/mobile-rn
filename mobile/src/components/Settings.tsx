import * as React from 'react';
import {
  Content,
  ListItem,
  Left,
  Button,
  Icon,
  Text,
  Body,
  Right,
  Switch
} from 'native-base';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { setDeveloperMode } from '../store/settings/actions';

interface Props {
  isDeveloperModeEnabled: boolean;
  onDeveloperModeValueChange: (isEnabled: boolean) => void;
}

function Settings(props: Props) {
  return (
    <Content>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: '#FF9501' }}>
            <Icon active name="bug" />
          </Button>
        </Left>
        <Body>
          <Text>Developer Mode</Text>
        </Body>
        <Right>
          <Switch
            value={props.isDeveloperModeEnabled}
            onValueChange={props.onDeveloperModeValueChange}
          />
        </Right>
      </ListItem>
    </Content>
  );
}

export default connect(
  (state: AppState) => ({
    isDeveloperModeEnabled: state.settings.developerMode
  }),
  dispatch => {
    return {
      onDeveloperModeValueChange: (isEnabled: boolean) => {
        dispatch(setDeveloperMode(isEnabled));
      }
    };
  }
)(Settings);
