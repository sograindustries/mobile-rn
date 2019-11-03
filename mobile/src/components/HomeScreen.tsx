import * as React from 'react';
import {
  Container,
  Text,
  Header,
  Right,
  View,
  Icon,
  Button,
  Footer,
  FooterTab
} from 'native-base';
import { StyleSheet } from 'react-native';
import { BleStatus } from '../store/ble/types';
import { connect } from 'react-redux';
import { AppState } from '../store';
import HeartChart from './HeartChart';
import { COLOR_GREEN2 } from '../colors';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { SCREEN_KEY_PROFILE } from './AppNavigator';

const styles = StyleSheet.create({
  nameText: {
    fontSize: 36,
    fontWeight: '400'
  },
  helloMessageSubtitle: {
    fontSize: 28,
    color: 'gray',
    fontWeight: '400'
  },

  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },

  footer: {
    backgroundColor: 'transparent'
    //  borderTopWidth: 0
  },

  helloMessageContainer: {
    flex: 1,
    paddingLeft: 10
  },

  heartChartContainer: {
    paddingTop: 10,
    paddingBottom: 10
  }
});

interface HelloMessageProps {
  status: BleStatus;
}

function HelloMessageInner(props: HelloMessageProps) {
  let text = 'Disconnected';
  let color = 'gray';

  switch (props.status) {
    case 'connected':
      text = 'Your fob is ';
      color = COLOR_GREEN2;
      break;
    case 'scanning':
    case 'connecting':
      text = 'Looking for your fob...';
      break;
  }

  return (
    <View style={styles.helloMessageContainer}>
      <Text style={styles.nameText}>Hello Will,</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={styles.helloMessageSubtitle}>{text}</Text>
        {props.status === 'connected' && (
          <Text style={{ ...styles.helloMessageSubtitle, color }}>
            connected
          </Text>
        )}
        <Text style={styles.helloMessageSubtitle}>.</Text>
      </View>
    </View>
  );
}
const HelloMessage = connect((state: AppState) => ({
  status: state.ble.status
}))(HelloMessageInner);

function ReportButton() {
  return (
    <Button
      iconLeft
      danger
      block
      style={{ margin: 10, marginBottom: 10, height: 60 }}>
      <Icon name="alert" />
      <Text>DON'T FEEL WELL</Text>
    </Button>
  );
}

interface AppHeaderProps {
  onProfilePress: () => void;
}

function AppHeaderInner(props: AppHeaderProps) {
  return (
    <Header style={styles.header}>
      <Right>
        <Button onPress={props.onProfilePress} transparent>
          <Icon name="settings" style={{ fontSize: 32, color: COLOR_GREEN2 }} />
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
      <Icon name="heart" style={{ color: COLOR_GREEN2, fontSize: 56 }} />
      <Text style={{ fontWeight: '500' }}>56 BPM</Text>
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

interface AppFooterProps {}

function AppFooter(props: AppFooterProps) {
  return (
    <Footer style={styles.footer}>
      <FooterTab>
        <Button
          vertical
          style={{
            backgroundColor: 'rgba(94, 213, 185, 0.2)'
          }}>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button vertical>
          <Icon name="person" style={{ opacity: 0.5 }} />
          <Text style={{ opacity: 0.8 }}>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

function HomeScreen() {
  return (
    <Container>
      <AppHeader />
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <HelloMessage />
        </View>

        <HeartChart />

        <StatusCards />

        <ReportButton />
      </View>
    </Container>
  );
}

export default HomeScreen;
