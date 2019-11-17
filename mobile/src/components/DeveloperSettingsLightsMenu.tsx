import * as React from 'react';
import {
  ListItem,
  Left,
  Button,
  Icon,
  Text,
  Body,
  Right,
  Switch,
  View
} from 'native-base';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { setLed } from '../store/ble/actions';
import { WithBleProps, withBle } from '../ble/hoc';
import DeveloperOnly from './DeveloperOnly';

interface Props {
  led1: boolean;
  led2: boolean;
  onLed1ValueChange: (isEnabled: boolean) => void;
  onLed2ValueChange: (isEnabled: boolean) => void;
}

function DeveloperSettingsLightsMenu(props: Props) {
  return (
    <DeveloperOnly>
      <View style={{ marginTop: 40 }}>
        <Text>Lights</Text>
      </View>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <ListItem icon>
          <Left>
            <Button>
              <Icon name="sunny" />
            </Button>
          </Left>
          <Body>
            <Text>Light 1</Text>
          </Body>
          <Right>
            <Switch
              value={props.led1}
              onValueChange={props.onLed1ValueChange}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon name="sunny" />
            </Button>
          </Left>
          <Body>
            <Text>Light 2</Text>
          </Body>
          <Right>
            <Switch
              value={props.led2}
              onValueChange={props.onLed2ValueChange}
            />
          </Right>
        </ListItem>
      </View>
    </DeveloperOnly>
  );
}

export default withBle(
  connect(
    (state: AppState) => ({
      led1: state.ble.led1,
      led2: state.ble.led2
    }),
    (dispatch: AppDispatch, ownProps: WithBleProps) => {
      return {
        onLed1ValueChange: (isEnabled: boolean) => {
          dispatch((innerDispatch: AppDispatch, getState: () => AppState) => {
            const deviceId = getState().ble.deviceId;
            if (deviceId) {
              ownProps.ble.setLED(deviceId, 1, isEnabled).then(() => {
                innerDispatch(setLed(1, isEnabled));
              });
            }
          });
        },
        onLed2ValueChange: (isEnabled: boolean) => {
          dispatch((innerDispatch: AppDispatch, getState: () => AppState) => {
            const deviceId = getState().ble.deviceId;
            if (deviceId) {
              ownProps.ble.setLED(deviceId, 2, isEnabled).then(() => {
                innerDispatch(setLed(2, isEnabled));
              });
            }
          });
        }
      };
    }
  )(DeveloperSettingsLightsMenu)
);
