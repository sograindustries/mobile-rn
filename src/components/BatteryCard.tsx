import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { BleStatus } from '../store/ble/types';
import { COLOR_GREEN } from '../colors';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';

interface Props {
  status: BleStatus;
  onPress: (status: BleStatus) => void;
}

function BatteryCard(props: Props) {
  return (
    <Button
      style={styles.btn}
      onPress={() => {
        props.onPress(props.status);
      }}>
      <Icon
        name="battery-full"
        style={{
          color: COLOR_GREEN,
          fontSize: 42,
          transform: [{ rotate: '270deg' }]
        }}
      />
      <Text style={{ color: COLOR_GREEN }}>60%</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 5,
    paddingRight: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  btn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});

export default connect(
  (state: AppState) => ({
    status: state.ble.status
  }),
  (_: AppDispatch) => {
    return {
      onPress: (_: BleStatus) => {}
    };
  }
)(BatteryCard);
