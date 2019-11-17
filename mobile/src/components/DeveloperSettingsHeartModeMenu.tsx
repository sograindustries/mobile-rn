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
import { setLed, setMode } from '../store/ble/actions';
import { WithBleProps, withBle } from '../ble/hoc';
import DeveloperOnly from './DeveloperOnly';
import { Mode } from '../ble/service';

interface Props {
  selectedMode: Mode;
  onModeChange: (newMode: Mode) => void;
}

function DeveloperSettingsHeartModeMenu(props: Props) {
  return (
    <DeveloperOnly>
      <View style={{ marginTop: 40 }}>
        <Text>Mode</Text>
      </View>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <ListItem
          selected={props.selectedMode === 'ramp'}
          onPress={() => {
            props.onModeChange('ramp');
          }}>
          <Body>
            <Text>Ramp</Text>
          </Body>
        </ListItem>
        <ListItem
          selected={props.selectedMode === 'real_ADC'}
          onPress={() => {
            props.onModeChange('real_ADC');
          }}>
          <Body>
            <Text>Real ADC</Text>
          </Body>
        </ListItem>
        <ListItem
          selected={props.selectedMode === 'arrhythmia'}
          onPress={() => {
            props.onModeChange('arrhythmia');
          }}>
          <Body>
            <Text>Arrhythmia</Text>
          </Body>
        </ListItem>

        <ListItem
          selected={props.selectedMode === 'constant'}
          onPress={() => {
            props.onModeChange('constant');
          }}>
          <Body>
            <Text>Constant</Text>
          </Body>
        </ListItem>
      </View>
    </DeveloperOnly>
  );
}

export default withBle(
  connect(
    (state: AppState) => ({
      selectedMode: state.ble.mode
    }),
    (dispatch: AppDispatch, ownProps: WithBleProps) => {
      return {
        onModeChange: (mode: Mode) => {
          dispatch((innerDispatch: AppDispatch, getState: () => AppState) => {
            const deviceId = getState().ble.deviceId;
            if (deviceId) {
              ownProps.ble.setMode(deviceId, mode).then(() => {
                innerDispatch(setMode(mode));
              });
            }
          });
        }
      };
    }
  )(DeveloperSettingsHeartModeMenu)
);
