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
import { AppState } from '../store';
import { setDeveloperMode, setSimulateFob } from '../store/settings/actions';
import DeveloperOnly from './DeveloperOnly';
import DeveloperSettingsLightsMenu from './DeveloperSettingsLightsMenu';
import DeveloperSettingsHeartModeMenu from './DeveloperSettingsHeartModeMenu';
import DeveloperSettingsEnterDFUMenu from './DeveloperSettingsEnterDFUMenu';

interface Props {
  isDeveloperModeEnabled: boolean;
  simulateFob: boolean;
  onDeveloperModeValueChange: (isEnabled: boolean) => void;
  onSimulateFobValueChange: (isEnabled: boolean) => void;
}

function Settings(props: Props) {
  return (
    <>
      <View style={{ backgroundColor: '#FFFFFF', marginTop: 40 }}>
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

        <DeveloperOnly>
          <ListItem icon>
            <Left>
              <Button transparent>
                <Icon active name="finger-print" />
              </Button>
            </Left>
            <Body>
              <Text>Simulate Fob</Text>
            </Body>
            <Right>
              <Switch
                value={props.simulateFob}
                onValueChange={props.onSimulateFobValueChange}
              />
            </Right>
          </ListItem>
        </DeveloperOnly>
      </View>

      <DeveloperSettingsHeartModeMenu />
      <DeveloperSettingsLightsMenu />
      <DeveloperSettingsEnterDFUMenu />
    </>
  );
}

export default connect(
  (state: AppState) => ({
    isDeveloperModeEnabled: state.settings.developerMode,
    simulateFob: state.settings.simulateFob
  }),
  dispatch => {
    return {
      onDeveloperModeValueChange: (isEnabled: boolean) => {
        dispatch(setDeveloperMode(isEnabled));
      },
      onSimulateFobValueChange: (isEnabled: boolean) => {
        dispatch(setSimulateFob(isEnabled));
      }
    };
  }
)(Settings);
