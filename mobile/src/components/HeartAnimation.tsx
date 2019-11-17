import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import { Icon, Text, View } from 'native-base';
import { COLOR_WHITE } from '../colors';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { withBle, WithBleProps } from '../ble/hoc';
import { defaultService } from '../ble/service';
import HB from '../bridge/HeartBeat';

interface Props {}

let buffer: number[] = [];

function HeartAnimation(props: Props & WithBleProps) {
  const [heartRate, setHeartRate] = React.useState<number | null>(null);

  React.useEffect(() => {
    const removeListener = defaultService.addOnValueListener((id, message) => {
      const values = message.payload;
      buffer = [...buffer, ...values].slice(0, 8000);

      HB.helloWorld(buffer).then((value: any) => {
        setHeartRate(value);
      });
    });

    return removeListener;
  }, []);

  return (
    <View style={styles.body}>
      <Animatable.Text
        animation={heartRate ? 'pulse' : undefined}
        easing="ease-out"
        iterationCount="infinite"
        style={{
          textAlign: 'center'
        }}>
        <Icon name="md-heart" style={styles.heartIcon} />
      </Animatable.Text>
      <View style={styles.bpmContainer}>
        <Text style={styles.bpmValueText}>{heartRate || '--'}</Text>
        <Text style={styles.bpmText}>BPM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  heartIcon: {
    fontSize: 120,
    color: '#FE5F55'
  },
  bpmContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingBottom: 5
  },
  bpmValueText: {
    fontSize: 32,
    color: COLOR_WHITE
  },
  bpmText: {
    fontSize: 10,
    color: COLOR_WHITE,
    marginTop: -5
  }
});

export default connect((state: AppState) => {
  return {
    isConnected: state.ble.status === 'connected'
  };
})(withBle(HeartAnimation));
