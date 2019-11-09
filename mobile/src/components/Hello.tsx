import * as React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { BleStatus } from '../store/ble/types';
import { COLOR_GREEN2 } from '../colors';
import { connect } from 'react-redux';
import { AppState } from '../store';

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
  name: string | null;
  status: BleStatus;
}

function HelloMessage(props: HelloMessageProps) {
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

  const message = props.name ? `Hello, ${props.name}` : 'Hey There!';

  return (
    <View style={styles.helloMessageContainer}>
      <Text style={styles.nameText}>{message}</Text>
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

export default connect((state: AppState) => ({
  status: state.ble.status,
  name: (state.user && state.user.firstName) || null
}))(HelloMessage);
