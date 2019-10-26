import * as React from 'react';
import {
  Footer as BaseFooter,
  FooterTab,
  Button,
  Icon,
  Text
} from 'native-base';
import { Tab } from '../store/navigation/types';

interface Props {
  tab: Tab;
  onProfilePress: () => void;
  onSummaryPress: () => void;
  onDoctorPress: () => void;
  onSettingsPress: () => void;
}

const Footer = (props: Props) => {
  return (
    <BaseFooter>
      <FooterTab>
        <Button onPress={props.onProfilePress}>
          <Icon name="md-person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>

      <FooterTab>
        <Button onPress={props.onSummaryPress}>
          <Icon name="pulse" />
          <Text>Live</Text>
        </Button>
      </FooterTab>

      <FooterTab>
        <Button onPress={props.onDoctorPress}>
          <Icon name="medkit" />
          <Text>Doctor</Text>
        </Button>
      </FooterTab>

      <FooterTab>
        <Button onPress={props.onSettingsPress}>
          <Icon name="settings" />
          <Text>Settings</Text>
        </Button>
      </FooterTab>
    </BaseFooter>
  );
};

export default Footer;
