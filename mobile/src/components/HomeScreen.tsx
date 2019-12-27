import * as React from 'react';
import {
  Container,
  Text,
  Header,
  Right,
  View,
  Icon,
  Button
} from 'native-base';
import HeartChart from './HeartChart';
import { COLOR_GREEN2, COLOR_GRAY } from '../colors';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { SCREEN_KEY_PROFILE } from './AppNavigator';
import AppFooter from './AppFooter';
import Hello from './Hello';
import { AppState } from '../store';
import { connect } from 'react-redux';
import BleContainer from '../ble/BleContainer';
import BleFWInfo from './BleFWInfo';
import { WithBleProps, withBle } from '../ble/hoc';
import PrefixAnnotationInput from './PrefixAnnotationInput';
import HeartAnimation from './HeartAnimation';

function ReportButtonInner(props: { deviceId: string | null } & WithBleProps) {
  const [light1, setLight1] = React.useState(false);

  return (
    <Button
      iconLeft
      danger
      block
      style={{ margin: 10, marginBottom: 10, height: 60 }}
      onPress={() => {
        if (props.deviceId) {
          props.ble.setLED(props.deviceId, 1, !light1);
          setLight1(!light1);
        }
      }}>
      <Icon name="alert" />
      <Text>DON'T FEEL WELL. {`${light1}`}</Text>
    </Button>
  );
}
const ReportButton = connect((state: AppState) => {
  return {
    deviceId: state.ble.deviceId
  };
})(withBle(ReportButtonInner));

interface AppHeaderProps {
  onProfilePress: () => void;
}

function AppHeaderInner(props: AppHeaderProps) {
  return (
    <Header transparent>
      <Right>
        <Button onPress={props.onProfilePress} transparent>
          <Icon name="settings" style={{ fontSize: 32, color: COLOR_GRAY }} />
        </Button>
      </Right>
    </Header>
  );
}

const AppHeader = withNavigation(({ navigation }: NavigationInjectedProps) => {
  const handleProfilePress = () => {
    navigation.navigate(SCREEN_KEY_PROFILE);
  };

  return <AppHeaderInner onProfilePress={handleProfilePress} />;
});

function BPMComponent() {
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        alignItems: 'center',
        padding: 20
      }}>
      <HeartAnimation />
    </View>
  );
}

function RhythmComponent() {
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 5,
        marginRight: 10,
        alignItems: 'center',
        padding: 20
      }}>
      <Icon name="pulse" style={{ color: COLOR_GREEN2, fontSize: 56 }} />
      <Text style={{ fontWeight: '500' }}>Normal Rhythm</Text>
    </View>
  );
}

function StatusCards() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
      <BPMComponent />
      <RhythmComponent />
    </View>
  );
}

function HomeScreen() {
  return (
    <Container>
      <BleContainer />
      <AppHeader />
      <BleFWInfo />
      <PrefixAnnotationInput />
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Hello />
        </View>
        <HeartChart />
        <StatusCards />
      </View>
      <AppFooter />
    </Container>
  );
}

export default withNavigation(
  connect((state: AppState) => {
    return {
      isLoggedIn: (state.session.user && state.session.user.jwt) !== null
    };
  })(HomeScreen)
);
