import * as React from 'react';
const {
  Surface,
  Group,
  RadialGradient,
  Shape
} = require('@react-native-community/art');
import { StyleSheet, Dimensions } from 'react-native';

const Heartbeat = () => {
  return <Heart />;
};

export default Heartbeat;

const HEART_SHAPE =
  'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z';

function Heart() {
  const surfaceDimensions = Dimensions.get('window').width;
  const gradient = new RadialGradient(
    {
      '.1': 'red'
    },
    50,
    50,
    20,
    20,
    50,
    50
  );

  return (
    <Surface
      width={surfaceDimensions}
      height={surfaceDimensions / 2}
      style={styles.surface}>
      <Group
        visible={true}
        opacity={1.0}
        x={surfaceDimensions / 2 - 50}
        y={surfaceDimensions / 4 - 50}>
        <Shape visible={true} opacity={1.0} d={HEART_SHAPE} fill={gradient} />
      </Group>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent'
  }
});
